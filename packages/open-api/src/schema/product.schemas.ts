import z from "zod";

const MAX_TOTAL_SIZE = 16 * 1024 * 1024;
export const productCreateSchema = z.object({
  title: z.string().min(1),
  shortDescription: z.string().max(160),
  basePrice: z.coerce.number().nonnegative(),
  salePrice: z.coerce.number().nonnegative(),
  stock: z.coerce.number().int().nonnegative(),
  tags: z.array(z.string()).optional(),
  weight: z.coerce.number().nonnegative().optional(),
  type: z.enum(["physical", "digital", "service"]).default("physical"),
  status: z.enum(["draft", "active", "archived"]).default("draft"),
  images: z
    .array(
      z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
        message: "Only image files are allowed",
      }),
    )
    .min(1, "At least one image is required")
    .max(5, "You can't add more then 5 images")
    .refine(
      (files) =>
        files.reduce((total, file) => total + file.size, 0) <= MAX_TOTAL_SIZE,
      {
        message: "Total image size must be less than 16MB",
      },
    ),
  categorySlug: z.string().nonempty(),
  subCategorySlug: z.string().nonempty(),
  color: z
    .array(
      z
        .string()
        .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Invalid hex color"),
    )
    .optional(),
  specification: z
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
  description: z.string(),
  cashOnDelevary: z.boolean().default(false),
  cupon: z.string().max(20).optional(),
  sizes: z.array(z.string()).optional(),
});

// const fileSchema = z.any().openapi({
//   type: "string",
//   format: "binary",
// });
// export const productBackendSchema = z.object({
//   title: z.string().min(1),

//   // 👇 Accept single OR multiple files, normalize to array
//   images: z.preprocess(
//     (val) => (Array.isArray(val) ? val : [val]),
//     z.array(fileSchema),
//   ),
//   shortDescription: z.string().max(160).optional(),
//   basePrice: z.coerce.number().nonnegative(),
//   salePrice: z.coerce.number().nonnegative(),
//   stock: z.coerce.number().int().nonnegative(),
//   tags: z.preprocess(
//     (val) => (Array.isArray(val) ? val : [val]),
//     z.array(z.string()).optional(),
//   ),
//   color: z.preprocess(
//     (val) => (Array.isArray(val) ? val : [val]),
//     z
//       .array(
//         z
//           .string()
//           .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Invalid hex color"),
//       )
//       .optional(),
//   ),
//   sizes: z.preprocess(
//     (val) => (Array.isArray(val) ? val : [val]),
//     z.array(z.string()).optional(),
//   ),
//   specification: z.preprocess(
//     (val) => {
//       if (!val) return undefined;

//       const arr = Array.isArray(val) ? val : [val];

//       return arr.flatMap((v) => (typeof v === "string" ? JSON.parse(v) : v));
//     },
//     z
//       .array(
//         z
//           .object({
//             key: z.string(),
//             value: z.string(),
//           })
//           .refine(
//             (data) =>
//               (data.key === "" && data.value === "") ||
//               (data.key !== "" && data.value !== ""),
//             {
//               message: "Both key and value are required",
//               path: ["value"],
//             },
//           ),
//       )
//       .optional(),
//   ),
//   description: z.string(),
//   cashOnDelevary: z.coerce.boolean().default(false),
//   cupon: z.string().max(20).optional(),
//   categorySlug: z.string().nonempty(),
//   subCategorySlug: z.string().nonempty(),
//   weight: z.coerce.number().nonnegative().optional(),
//   type: z.enum(["physical", "digital", "service"]).default("physical"),
//   status: z.enum(["draft", "active", "archived"]).default("draft"),
// });
