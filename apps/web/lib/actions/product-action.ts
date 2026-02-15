import { Products } from "@workspace/db";
import {
  productCreateSchema,
  updateProductSchema,
} from "@workspace/open-api/schemas/product.schemas";
import z from "zod";

export const productCreateAction = async (
  data: z.input<typeof productCreateSchema>,
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "images" && Array.isArray(value)) {
      value.forEach((file) => formData.append("images", file));
    } else if (key === "previousImage" && Array.isArray(value)) {
      value.forEach((img) => formData.append("previousImage", img));
    } else if (key === "tags" && Array.isArray(value)) {
      value.forEach((tag) => formData.append("tags", tag));
    } else if (key === "color" && Array.isArray(value)) {
      value.forEach((c) => formData.append("color", c));
    } else if (key === "sizes" && Array.isArray(value)) {
      value.forEach((c) => formData.append("sizes", c));
    } else if (key === "specification" && Array.isArray(value)) {
      formData.append("specification", JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const response = await fetch("http://localhost:6002/api/v1/products/create", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};

export const getAllProductsAction = async (userEmail?: string) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_PRODUCTS_URL}/products/all-products`,
  );

  if (userEmail) {
    url.searchParams.set("userEmail", userEmail);
  }
  const response = await fetch(url.toString(), {
    method: "GET",
  });
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  const data: {
    products: (Products & {
      user: { id: string; image: string; name: string };
    })[];
  } = await response.json();
  return { products: data.products };
};

export const getSingleProductAction = async (id: string) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_PRODUCTS_URL}/products/single-product`,
  );

  if (id) {
    url.searchParams.set("id", id);
  }
  const response = await fetch(url.toString(), {
    method: "GET",
  });
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  const data = await response.json();
  return { product: data };
};

//update product

export const productUpdateAction = async (
  data: z.input<typeof updateProductSchema>,
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "images" && Array.isArray(value)) {
      value.forEach((file) => formData.append("images", file));
    } else if (key === "previousImage" && Array.isArray(value)) {
      value.forEach((img) => formData.append("previousImage", img));
    } else if (key === "tags" && Array.isArray(value)) {
      value.forEach((tag) => formData.append("tags", tag));
    } else if (key === "color" && Array.isArray(value)) {
      value.forEach((c) => formData.append("color", c));
    } else if (key === "sizes" && Array.isArray(value)) {
      value.forEach((c) => formData.append("sizes", c));
    } else if (key === "specification" && Array.isArray(value)) {
      formData.append("specification", JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const response = await fetch(
    "http://localhost:6002/api/v1/products/update-product",
    {
      method: "PATCH",
      body: formData,
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};
