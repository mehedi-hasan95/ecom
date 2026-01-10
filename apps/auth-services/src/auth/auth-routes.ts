import { createRoute, z } from "@hono/zod-openapi";
import {
  loginSchema,
  registrationSchema,
  verifyRegistrationEmailSchema,
} from "@workspace/open-api/schemas/auth.schemas";

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
  path: "/registration/registration-otp",
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

// verify email
export const verifyRegistrationRoute = createRoute({
  method: "post",
  path: "/registration/verify-email",
  tags,
  request: {
    body: {
      content: {
        "application/json": {
          schema: verifyRegistrationEmailSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: verifyRegistrationEmailSchema,
        },
      },
      description: "Verify your email with OTP",
    },
    500: {
      description: "Internal server error",
    },
  },
});

export const loginRoute = createRoute({
  method: "post",
  path: "/login",
  tags,
  request: {
    body: { content: { "application/json": { schema: loginSchema } } },
  },
  responses: {
    201: {
      content: {
        "application/json": { schema: loginSchema },
      },
      description: "Login API",
    },
    500: {
      description: "Internal server error",
    },
  },
});

//session

export const loginSessionRoute = createRoute({
  method: "get",
  path: "/session",
  tags,
  responses: {
    200: {
      schema: z.object({
        // or your Session schema
        success: z.boolean(),
        session: z.any(),
      }),
      description: "Authenticated session",
    },
    401: { description: "Unauthorize" },
  },
});

export const testRoute = createRoute({
  method: "get",
  path: "/",
  tags,
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({ example: "Mehedi Hasan" }),
          }),
        },
      },
      description: "Retrieve the user",
    },
  },
});
