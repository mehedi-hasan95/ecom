import { createRoute, z } from "@hono/zod-openapi";
import { registrationSchema } from "@workspace/open-api/schemas/auth.schemas";

const tags = ["Auth"];
export const authGetRoute = createRoute({
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

export const authCreateRoute = createRoute({
  method: "post",
  path: "/",
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
          schema: z.object({
            message: z.string(),
            status: z.string(),
            otprestriction: z.any(),
            otpRequests: z.any(),
            otp: z.string(),
          }),
        },
      },
      description: "Please check your email",
    },
    409: {
      description: "Email already exists",
    },
  },
});
