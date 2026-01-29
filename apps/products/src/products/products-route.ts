import { createRoute } from "@hono/zod-openapi";
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
