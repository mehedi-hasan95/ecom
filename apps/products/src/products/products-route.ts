import { createRoute, z } from "@hono/zod-openapi";
import { sellerMiddleware } from "../middleware";
import { productSchemasForserver } from "@workspace/open-api/schemas/product.schemas";

const tags = ["Products"];

const fileSchema = z.any().openapi({
  type: "string",
  format: "binary",
});
export const createProductRoute = createRoute({
  method: "post",
  path: "/create",
  tags,
  summary: "Create Product",
  middleware: sellerMiddleware,
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: productSchemasForserver,
        },
      },
    },
  },
  responses: {
    201: {
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

export const getProductsRoute = createRoute({
  method: "get",
  path: "/all-products",
  tags,
  summary: "Get all products",
  description:
    "The seller can get their products by using their email, alongside all products.",
  request: {
    query: z.object({ userEmail: z.string().optional() }),
  },
  responses: {
    200: { description: "All products" },
    500: { description: "Internal server error" },
  },
});

export const getSingleProductRoute = createRoute({
  method: "get",
  path: "/single-product",
  tags,
  summary: "Get Single Product",
  request: {
    query: z.object({ id: z.string() }),
  },
  responses: {
    200: { description: "Found" },
    404: { description: "Not Found" },
  },
});
