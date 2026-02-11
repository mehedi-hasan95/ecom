import { createRoute, z } from "@hono/zod-openapi";
import { sellerMiddleware } from "../middleware";

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
          schema: z.object({
            title: z.string().min(1),

            // 👇 Accept single OR multiple files, normalize to array
            images: z.preprocess(
              (val) => (Array.isArray(val) ? val : [val]),
              z.array(fileSchema),
            ),
            shortDescription: z.string().max(160),
            basePrice: z.coerce.number().nonnegative(),
            salePrice: z.coerce.number().nonnegative(),
            stock: z.coerce.number().int().nonnegative(),
            tags: z.preprocess(
              (val) => (Array.isArray(val) ? val : [val]),
              z.array(z.string()).optional(),
            ),
            color: z.preprocess(
              (val) => (Array.isArray(val) ? val : [val]),
              z
                .array(
                  z
                    .string()
                    .regex(
                      /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
                      "Invalid hex color",
                    ),
                )
                .optional(),
            ),
            sizes: z.preprocess(
              (val) => (Array.isArray(val) ? val : [val]),
              z.array(z.string()).optional(),
            ),
            specification: z.preprocess(
              (val) => {
                if (!val) return undefined;

                const arr = Array.isArray(val) ? val : [val];

                return arr.flatMap((v) =>
                  typeof v === "string" ? JSON.parse(v) : v,
                );
              },
              z
                .array(
                  z
                    .object({
                      key: z.string(),
                      value: z.string(),
                    })
                    .refine(
                      (data) =>
                        (data.key === "" && data.value === "") ||
                        (data.key !== "" && data.value !== ""),
                      {
                        message: "Both key and value are required",
                        path: ["value"],
                      },
                    ),
                )
                .optional(),
            ),
            description: z.string(),
            cashOnDelevary: z.coerce.boolean().default(false),
            cupon: z.string().max(20).optional(),
            categorySlug: z.string().nonempty(),
            subCategorySlug: z.string().nonempty(),
            weight: z.coerce.number().nonnegative().optional(),
            type: z
              .enum(["physical", "digital", "service"])
              .default("physical"),
            status: z.enum(["draft", "active", "archived"]).default("draft"),
          }),
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
