import { z } from "zod";

export const userRoleSchema = z.enum(["USER", "SELLER"]);

const customError = "custom" as const;

export const registrationSchema = z
  .object({
    name: z.string({ message: "Name is required!" }).min(2).max(50),

    email: z.string().email("Email is required"),

    password: z.string({ message: "Password is required" }).min(2).max(64),

    userRole: userRoleSchema.default("USER"),

    phone: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.string().min(6, { message: "Phone number is too short" }).optional()
    ),
  })
  .superRefine((data, ctx) => {
    if (data.userRole === "SELLER" && !data.phone) {
      ctx.addIssue({
        path: ["phone"],
        message: "Phone number is required for sellers",
        code: customError,
      });
    }
  });
