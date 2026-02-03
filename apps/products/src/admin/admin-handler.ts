import { RouteHandler } from "@hono/zod-openapi";
import { createCategoryRoute } from "./admin-route";
import { utapi } from "@workspace/uploadthing";
import { prisma } from "@workspace/db";

export const createCategoryHandler: RouteHandler<
  typeof createCategoryRoute
> = async (c) => {
  const { name, slug, image } = await c.req.valid("form");
  const baseSlug = slug;

  const existingSlugs = await prisma.category.findMany({
    where: {
      slug: {
        startsWith: baseSlug,
      },
    },
    select: {
      slug: true,
    },
  });
  let finalSlug = slug;
  if (existingSlugs.length > 0) {
    const counts = existingSlugs
      .map((item) => {
        const parts = item.slug.split("-");
        const lastPart = parseInt(parts[parts.length - 1] || "0");
        return isNaN(lastPart) ? 0 : lastPart;
      })
      .sort((a, b) => a - b);

    const lastNumber = counts[counts.length - 1] || 0;
    finalSlug = `${slug}-${lastNumber + 1}`;
  }

  let imageUrl: string | undefined;

  if (image) {
    const uploadedImages = await utapi.uploadFiles(image);
    imageUrl = uploadedImages.data?.ufsUrl;
  }

  await prisma.category.create({
    data: {
      name,
      slug: finalSlug,
      image: imageUrl,
    },
  });

  return c.json(
    { success: true, message: "Category created successfully" },
    201,
  );
};
