import { createRoute, z } from "@hono/zod-openapi";

export const betterCreateRoute = createRoute({
  method: "post",
  path: "/registration",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            email: z.email().openapi({ example: "user@example.com" }),
            name: z.string().openapi({ example: "John Doe" }),
            password: z.string().openapi({ example: "strongPassword123" }),
          }),
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
          }),
        },
      },
      description: "Better auth email",
    },
    409: {
      description: "Email already exists",
    },
  },
});
