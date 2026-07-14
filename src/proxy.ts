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
const authPages = ["/auth/login", "/auth/register", "/login", "/register"];

export default auth((req: any) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth?.user;
  const role = (req.auth?.user as any)?.role;

  // Root redirect
  if (pathname === "/") {
    if (isLoggedIn) {
      if (role === "ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // 1️⃣ Logged‑in users on auth pages → redirect to respective dashboard
  if (authPages.some(p => pathname.startsWith(p)) && isLoggedIn) {
    if (role === "ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 2️⃣ Not logged in on protected pages → login
  if (protectedPaths.some(p => pathname.startsWith(p)) && !isLoggedIn) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3️⃣ Admin routes → role check (students blocked)
  if (adminPaths.some(p => pathname.startsWith(p))) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // 4️⃣ Student routes → block admins
  if (protectedPaths.some(p => pathname.startsWith(p))) {
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // All good → continue
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/", // match root
    "/dashboard/:path*",
    "/analytics/:path*",
    "/tutor/:path*",
    "/learning-path/:path*",
    "/practice/:path*",
    "/settings/:path*",
    "/admin/:path*",
    "/auth/:path*",
    "/login",
    "/register"
  ],
};
