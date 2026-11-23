import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/",
  "/tuitions",
  "/pricing",
  "/about",
  "/sign-in",
  "/sign-up",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.includes(pathname) || pathname.startsWith("/tuitions/")) {
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const sessionToken =
      request.cookies.get("better-auth.session_token")?.value ||
      request.cookies.get("__Secure-better-auth.session_token")?.value;

    if (!sessionToken) {
      const signInUrl = new URL("/sign-in", request.url);

      signInUrl.searchParams.set("callbackUrl", pathname);

      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
