import z from "zod";

export const userRoleSchema = z.enum(["USER", "SELLER"]);
export const registrationSchema = z
  .object({
    name: z
      .string({ message: "Name is required!" })
      .min(2, { message: "Name must be at least 2 characters!" })
      .max(50),
    email: z.string({ message: "Email is required" }).email(),
    password: z
      .string({ message: "Password is required" })
      .min(2, { message: "Password must be at least 2 characters!" })
      .max(64, { message: "Password must be less then 64 characters!" }),
    userRole: userRoleSchema.default("USER"),
    phone: z
      .string()
      .min(6, { message: "Phone number is too short" })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.userRole === "SELLER" && !data.phone) {
      ctx.addIssue({
        path: ["phone"],
        message: "Phone number is required for sellers",
        code: z.ZodIssueCode.custom,
      });
    }
  });
