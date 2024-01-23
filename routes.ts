export const publicRoutes = [
  "auth/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/404",
  "/500",
];
export const privateRoutes = ["/", "/dashboard", "/settings"];

export const authRoutes = ["/auth/login"];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_REDIRECT_URL = "/";

export const LOGOUT_REDIRECT_URL = "/auth/login";
