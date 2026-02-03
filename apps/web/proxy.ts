import { NextRequest, NextResponse } from "next/server";
import { sessionAction } from "./lib/actions/auth-server-action";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = await sessionAction();

  if (!session?.success) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (
    pathname.startsWith("/dashboard/vendor") &&
    !["SELLER", "ADMIN"].includes(session.user.role)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // admin
  if (
    pathname.startsWith("/dashboard/admin") &&
    session.user.role !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
