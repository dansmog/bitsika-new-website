import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/en-us" || pathname.startsWith("/en-us/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en-us/, "") || "/";
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
