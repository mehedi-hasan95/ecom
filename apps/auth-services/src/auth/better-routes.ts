import { createRoute, z } from "@hono/zod-openapi";
import { registrationSchema } from "@workspace/open-api/schemas/auth.schemas";

const tags = ["Authentication"];
export const registrationRoute = createRoute({
  method: "post",
  path: "/registration",
  tags,
  request: {
    body: {
      content: {
        "application/json": {
          schema: registrationSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: registrationSchema,
        },
      },
      description: "Register your account",
    },
    500: {
      description: "Something went wrong",
    },
  },
});

export const registrationOtpRoute = createRoute({
  method: "post",
  path: "/registration/verify-otp",
  tags,
  description: "You need to pass the email as body",
  request: {
    body: {
      content: {
        "application/json": { schema: z.object({ email: z.email() }) },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: z.object({ email: z.string() }),
        },
      },
      description: "Send OTP",
    },
    500: {
      description: "Internal server error",
    },
  },
});
