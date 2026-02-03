import { createRoute, z } from "@hono/zod-openapi";
import { slugRegex } from "@workspace/open-api/schemas/regx";
import { adminMiddleware } from "../middleware";

export const createCategoryRoute = createRoute({
  method: "post",
  path: "/create-category",
  tags: ["Admin"],
  summary: "Create Category",
  middleware: adminMiddleware,
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: z.object({
            name: z.string().min(1).max(50),
            slug: z
              .string()
              .min(1)
              .max(80)
              .regex(slugRegex, "Invalid slug format"),
            image: z
              .any()
              .openapi({
                type: "string",
                format: "binary",
              })
              .optional(),
          }),
        },
      },
    },
  },
  responses: {
    201: { description: "OK" },
    401: { description: "Unauthorize" },
    500: { description: "Internal server error" },
  },
});
