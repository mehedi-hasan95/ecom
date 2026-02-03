import { createRoute, z } from "@hono/zod-openapi";
import { authMiddleware } from "../middleware";

const tags = ["Products"];
export const createProductRoute = createRoute({
  method: "get",
  path: "/",
  tags,
  middleware: authMiddleware,
  responses: {
    201: { description: "OK" },
    401: { description: "Unauthorize" },
    500: { description: "Internal server error" },
  },
});

const fileSchema = z.any().openapi({
  type: "string",
  format: "binary",
});
export const uploadImageRoute = createRoute({
  method: "post",
  path: "/upload",
  tags,
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: z.object({
            title: z.string().min(1),

            // 👇 Accept single OR multiple files, normalize to array
            images: z.preprocess(
              (val) => (Array.isArray(val) ? val : [val]),
              z.array(fileSchema),
            ),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Images uploaded successfully",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Not ok",
    },
  },
});
