import { RouteHandler } from "@hono/zod-openapi";
import {
  registrationRoute,
  registrationOtpRoute,
  testRoute,
  verifyRegistrationRoute,
  loginRoute,
  loginSessionRoute,
} from "./auth-routes";
import { auth } from "@workspace/better-auth/server";
import { prisma } from "@workspace/db";

export const registrationHandler: RouteHandler<
  typeof registrationRoute
> = async (c) => {
  const { email, name, password, role, phone } = c.req.valid("json");
  try {
    const result = await auth.api.signUpEmail({
      body: { email, name, password, role, phone },
    });
    // if (result.user.id) {
    //   await auth.api.sendVerificationOTP({
    //     body: { email, type: "email-verification" },
    //   });
    // }
    return c.json(result, 200);
  } catch (err: any) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user?.emailVerified === false) {
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

export const registrationOtpHandler: RouteHandler<
  typeof registrationOtpRoute
> = async (c) => {
  const { email } = c.req.valid("json");
  try {
    const data = await auth.api.sendVerificationOTP({
      body: {
        email: email, // required
        type: "email-verification", // required
      },
    });
    return c.json({ success: true, data });
  } catch (error) {
    return c.json({ success: false, error });
  }
};

export const verifyRegistrationHandler: RouteHandler<
  typeof verifyRegistrationRoute
> = async (c) => {
  const { email, otp } = c.req.valid("json");
  try {
    const data = await auth.api.verifyEmailOTP({
      body: {
        email,
        otp,
      },
    });
    return c.json({ success: true, data });
  } catch (error) {
    return c.json({ success: false, error });
  }
};

export const loginHandler: RouteHandler<typeof loginRoute> = async (c) => {
  const { email, password } = c.req.valid("json");
  try {
    return await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      asResponse: true, // returns a response object instead of data
    });
  } catch (error) {
    return c.json({ success: false, error });
  }
};

export const loginSessionHandler: RouteHandler<
  typeof loginSessionRoute
> = async (c) => {
  const allCookies = c.req.header("cookie");
  console.log("Raw Cookie Header:", allCookies);
  const session = await auth.api.getSession({
    headers: new Headers(c.req.raw.headers),
  });

  if (!session) {
    return c.json({ success: false, error: "Unauthorized" }, 401);
  }

  return c.json({ success: true, session }, 200);
};

export const testHandler: RouteHandler<typeof testRoute> = async (c) => {
  return c.json(
    {
      message: "Mehedi",
    },
    200
  );
};
