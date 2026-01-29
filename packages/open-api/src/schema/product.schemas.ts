import z from "zod";

export const productCreateSchema = z.object({
  images: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.type.startsWith("image/"), {
          message: "Only image files are allowed",
        }),
    )
    .min(1, "At least one image is required"),
});
