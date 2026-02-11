import { productCreateSchema } from "@workspace/open-api/schemas/product.schemas";
import z from "zod";

export const productCreateAction = async (
  data: z.input<typeof productCreateSchema>,
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "images" && Array.isArray(value)) {
      value.forEach((file) => formData.append("images", file));
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
