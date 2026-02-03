import { Category } from "@workspace/db";

export const getCategoriesAction = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCTS_URL}/categories`,
  );
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  const data: { categories: Category[] } = await response.json();
  return { categories: data.categories };
};

export const getCategoryAction = async (category: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCTS_URL}/categories/${category}`,
  );
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  const data: { category: Category } = await response.json();
  return { category: data.category };
};
