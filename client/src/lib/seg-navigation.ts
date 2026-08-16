export const SEG_ROUTES = {
  landing: "/",
  register: "/register",
  login: "/login",
  dashboard: "/dashboard",
} as const;

export function routeRequiresAuth(path: string): boolean {
  return path === SEG_ROUTES.dashboard;
}

export type DashboardAccessState = "loading" | "unauthenticated" | "authenticated";

export function getDashboardAccessState({ loading, isAuthenticated }: { loading: boolean; isAuthenticated: boolean }): DashboardAccessState {
  if (loading) return "loading";
  return isAuthenticated ? "authenticated" : "unauthenticated";
}
