import { describe, expect, it } from "vitest";
import { getSessionCookieOptions } from "./cookies";

describe("getSessionCookieOptions", () => {
  it("marks the session cookie Secure for a public SEG hostname behind a TLS-terminating proxy", () => {
    const request = {
      protocol: "http",
      hostname: "seg-guide-bjjkqn7t.manus.space",
      headers: {},
    } as Parameters<typeof getSessionCookieOptions>[0];

    expect(getSessionCookieOptions(request)).toMatchObject({
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: true,
    });
  });

  it("keeps local HTTP development usable without weakening public hosts", () => {
    const request = {
      protocol: "http",
      hostname: "localhost",
      headers: {},
    } as Parameters<typeof getSessionCookieOptions>[0];

    expect(getSessionCookieOptions(request)).toMatchObject({
      secure: false,
      httpOnly: true,
      sameSite: "none",
      path: "/",
    });
  });
});
