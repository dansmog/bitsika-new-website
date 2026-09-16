import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Forwards the request pathname as `x-pathname`, so the root layout can set
 * `<html lang>` from it.
 */
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
