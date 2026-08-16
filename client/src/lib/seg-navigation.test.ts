import { describe, expect, it } from "vitest";
import { getDashboardAccessState, routeRequiresAuth, SEG_ROUTES } from "./seg-navigation";

describe("SEG route protection", () => {
  it("keeps My Home behind the authentication boundary", () => {
    expect(routeRequiresAuth(SEG_ROUTES.dashboard)).toBe(true);
  });

  it("keeps Landing, Registration, and Login publicly reachable", () => {
    expect(routeRequiresAuth(SEG_ROUTES.landing)).toBe(false);
    expect(routeRequiresAuth(SEG_ROUTES.register)).toBe(false);
    expect(routeRequiresAuth(SEG_ROUTES.login)).toBe(false);
  });

  it("keeps unauthenticated users out of My Home while the session state resolves", () => {
    expect(getDashboardAccessState({ loading: true, isAuthenticated: false })).toBe("loading");
    expect(getDashboardAccessState({ loading: false, isAuthenticated: false })).toBe("unauthenticated");
    expect(getDashboardAccessState({ loading: false, isAuthenticated: true })).toBe("authenticated");
  });
});
