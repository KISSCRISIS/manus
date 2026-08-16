import "dotenv/config";
import compression from "compression";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import {
  configureSecurity,
  createApiRateLimiter,
  createAuthRateLimiter,
  errorHandler,
  notFoundHandler,
  requestLoggingMiddleware,
} from "./production";
import { log } from "./logger";
import { assertProductionEnvironment } from "./env";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

function getTrustProxySetting() {
  const value = process.env.TRUST_PROXY;
  if (!value) return process.env.NODE_ENV === "production" ? 1 : false;
  if (value === "true") return true;
  if (value === "false") return false;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : value;
}

function getBodyLimit() {
  return process.env.BODY_SIZE_LIMIT ?? "10mb";
}

async function startServer() {
  assertProductionEnvironment();
  const app = express();
  const server = createServer(app);

  app.set("trust proxy", getTrustProxySetting());
  configureSecurity(app);
  app.use(requestLoggingMiddleware());
  app.use(
    compression({
      threshold: 1024,
      level: 6,
      filter: (req, res) => {
        if (req.headers["x-no-compression"]) return false;
        return compression.filter(req, res);
      },
    })
  );

  // Configure body parser with an explicit production limit.
  app.use(express.json({ limit: getBodyLimit() }));
  app.use(express.urlencoded({ limit: getBodyLimit(), extended: true }));

  // Health checks stay lightweight and do not require authentication.
  app.get("/healthz", (req, res) => {
    res.status(200).json({
      status: "ok",
      service: process.env.SERVICE_NAME ?? "seg-api",
      environment: process.env.NODE_ENV ?? "development",
      uptimeSeconds: Math.floor(process.uptime()),
      version: process.env.APP_VERSION ?? "unknown",
      requestId: req.requestId,
    });
  });

  // Apply stricter controls to API and authentication surfaces.
  app.use("/api/trpc", createApiRateLimiter());
  app.use("/api/oauth", createAuthRateLimiter());

  registerStorageProxy(app);
  registerOAuthRoutes(app);

  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // API paths never fall through to the SPA shell.
  app.use("/api", notFoundHandler);

  // Development mode uses Vite; production mode serves the compiled SPA.
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  app.use(errorHandler);

  server.keepAliveTimeout = Number(process.env.KEEP_ALIVE_TIMEOUT_MS ?? 5_000);
  server.headersTimeout = Number(process.env.HEADERS_TIMEOUT_MS ?? 6_000);
  server.requestTimeout = Number(process.env.REQUEST_TIMEOUT_MS ?? 30_000);

  const preferredPort = parseInt(process.env.PORT || "3000", 10);
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    log.warn("preferred_port_unavailable", { preferredPort, selectedPort: port });
  }

  server.listen(port, () => {
    log.info("server_started", {
      url: `http://localhost:${port}/`,
      port,
      environment: process.env.NODE_ENV ?? "development",
    });
  });
}

process.on("unhandledRejection", reason => {
  log.error("unhandled_rejection", { error: reason });
});

process.on("uncaughtException", error => {
  log.error("uncaught_exception", { error });
  process.exitCode = 1;
});

startServer().catch(error => {
  log.error("server_start_failed", { error });
  process.exitCode = 1;
});
