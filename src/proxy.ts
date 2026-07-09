// src/proxy.ts
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

// -------------------------------------------------------------------
// Routes that require authentication
// -------------------------------------------------------------------
const protectedPaths = [
  "/dashboard",
  "/analytics",
  "/tutor",
  "/learning-path",
  "/practice",
  "/settings",
];

// Admin‑only routes
const adminPaths = ["/admin"];

// Auth pages – redirect logged‑in users to dashboard
const authPages = ["/auth/login", "/auth/register"];

export default auth((req: any) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth?.user;

  // 1️⃣ Logged‑in users on auth pages → dashboard
  if (authPages.some(p => pathname.startsWith(p)) && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 2️⃣ Not logged in on protected pages → login
  if (protectedPaths.some(p => pathname.startsWith(p)) && !isLoggedIn) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3️⃣ Admin routes → role check
  if (adminPaths.some(p => pathname.startsWith(p))) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    const role = (req.auth?.user as any)?.role;
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // All good → continue
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/analytics/:path*",
    "/tutor/:path*",
    "/learning-path/:path*",
    "/practice/:path*",
    "/settings/:path*",
    "/admin/:path*",
    "/auth/:path*",
  ],
};
