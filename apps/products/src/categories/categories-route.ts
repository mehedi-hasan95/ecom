import { createRoute, z } from "@hono/zod-openapi";

const tags = ["Everyone"];
export const getCategoriesRoute = createRoute({
  method: "get",
  path: "/",
  summary: "Get Categories",
  tags,
  responses: {
    200: { description: "OK" },
    500: { description: "Internal server error" },
  },
});

export const getCategoryRoute = createRoute({
  method: "get",
  path: "/:category",
  tags,
  summary: "Get a category",
  request: {
    params: z.object({
      category: z.string(),
    }),
  },
  responses: {
    200: { description: "OK" },
    404: { description: "NOT FOUND" },
    500: { description: "NOT" },
  },
});
