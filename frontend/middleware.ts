import type { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

import environment from "./config/environment";
import { JWTExtended } from "./types/Auth";

export async function middleware(request: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: environment.AUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  if (pathname === "/auth/login" || pathname === "/auth/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/hr")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);

      url.searchParams.set("callbackUrl", encodeURI(request.url));

      return NextResponse.redirect(url);
    }

    if (token?.user?.role !== "HR") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);

      url.searchParams.set("callbackUrl", encodeURI(request.url));

      return NextResponse.redirect(url);
    }

    if (token?.user?.role === "HR") {
      return NextResponse.redirect(new URL("/hr/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/hr/:path*", "/dashboard/:path*"],
};
