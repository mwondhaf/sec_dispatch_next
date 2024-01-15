import { auth } from "./auth";
import {
  DEFAULT_REDIRECT_URL,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";
import jwt from "jsonwebtoken";
import * as jose from "jose";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // check if token is valid
  // if not, redirect to login
  // if valid, continue

  // var decoded = jwt.verify(token!, process.env.AUTH_SECRET!);
  // console.log({ decoded });
  // if (token) {
  //   const isValid = jwtVerify(token, process.env.AUTH_SECRET!);
  // }

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return null;
  if (isAuthRoute) {
    if (isLoggedIn) {
      // Redirect to default redirect url
      return Response.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl));
    }
    // Continue to auth route
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    // Redirect to login
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;

  // req.auth
});
// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
