import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "@workspace/db";
import { StatusErrors } from "@workspace/status-message";
import { registrationSchema } from "@workspace/schemas";

const app = new Hono()
  .get("/", (c) => c.json("list books"))
  .post("/", zValidator("json", registrationSchema), async (c) => {
    const data = c.req.valid("json");
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw StatusErrors.NotFound();
    }
    return c.json({
      success: true,
      message: user,
      dist: data,
    });
  });

export default app;
