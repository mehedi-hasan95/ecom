import { RouteHandler } from "@hono/zod-openapi";
import { createProductRoute } from "./products-route";
import { utapi } from "@workspace/uploadthing";
import { prisma } from "@workspace/db";

export const createProductHandler: RouteHandler<
  typeof createProductRoute
> = async (c) => {
  const data = await c.req.valid("form");
  const uploadedImages = await utapi.uploadFiles(data.images);

  const imageLinks = uploadedImages.map((item) => item.data?.ufsUrl);
  await prisma.products.create({
    data: {
      ...data,
      images: imageLinks as string[],
    },
  });

  return c.json({ message: "Product created successfully" }, 201);
};
