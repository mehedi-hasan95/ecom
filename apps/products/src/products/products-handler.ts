import { RouteHandler } from "@hono/zod-openapi";
import { createProductRoute, getProductsRoute } from "./products-route";
import { utapi } from "@workspace/uploadthing";
import { prisma } from "@workspace/db";

export const createProductHandler: RouteHandler<
  typeof createProductRoute
> = async (c) => {
  const user = c.get("user");
  const data = await c.req.valid("form");
  const uploadedImages = await utapi.uploadFiles(data.images);

  const imageLinks = uploadedImages.map((item) => item.data?.ufsUrl);
  await prisma.products.create({
    data: {
      ...data,
      images: imageLinks as string[],
      userEmail: user?.email!,
    },
  });

  return c.json({ message: "Product created successfully" }, 201);
};

export const getProductsHandler: RouteHandler<typeof getProductsRoute> = async (
  c,
) => {
  const { userEmail } = c.req.valid("query");
  const products = await prisma.products.findMany({
    where: { userEmail },
    include: { user: { select: { id: true, image: true, name: true } } },
  });

  return c.json({ products }, 200);
};
