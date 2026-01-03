import { RouteHandler } from "@hono/zod-openapi";
import { betterCreateRoute } from "./better-routes";
import { auth } from "@workspace/better-auth/server";
import { prisma } from "@workspace/db";

export const betterCreateHandler: RouteHandler<
  typeof betterCreateRoute
> = async (c) => {
  const { email, name, password } = c.req.valid("json");
  try {
    const result = await auth.api.signUpEmail({
      body: { email, name, password },
    });

    return c.json(result, 200);
  } catch (err: any) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user?.emailVerified) {
      return c.json(
        {
          success: false,
          message: "Please verify your account. Resend the verification OTP",
          status: "not_acceptable",
        },
        406
      );
    }
    if (err?.statusCode) {
      return c.json(
        {
          success: false,
          message: err.body?.message,
          status: err.status,
        },
        err?.statusCode
      );
    }
    return c.json(
      {
        success: false,
        message: "Internal server error",
      },
      500
    );
  }
};
