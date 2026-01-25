import { NextRequest, NextResponse } from "next/server";
import { sessionAction } from "./lib/actions/auth-server-action";

export async function proxy(request: NextRequest) {
  const session = await sessionAction();

  if (!session?.success) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"], // Specify the routes the middleware applies to
};
