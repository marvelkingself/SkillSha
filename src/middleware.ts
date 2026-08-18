import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  if (host === "www.skillsha.com") {
    const url = request.nextUrl.clone();
    url.host = "skillsha.com";
    url.port = ""; // Ensure port is stripped if any
    return NextResponse.redirect(url.toString(), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icon.png, etc. (static files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png).*)",
  ],
};
