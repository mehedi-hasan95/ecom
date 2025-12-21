import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import z from "zod";
import { prisma } from "@workspace/db";
import { StatusErrors } from "@workspace/status-message";

const app = new Hono()
  .get("/", (c) => c.json("list books"))
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.string(),
        age: z.number(),
      })
    ),
    async (c) => {
      const data = c.req.valid("json");
      const user = await prisma.user.findUnique({
        where: { email: data.name },
      });
      if (!user) {
        throw StatusErrors.NotFound();
      }
      return c.json({
        success: true,
        message: user,
      });
    }
  );

export default app;
