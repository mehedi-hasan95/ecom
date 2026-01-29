import { RouteHandler } from "@hono/zod-openapi";
import { createProductRoute } from "./products-route";
import { auth } from "@workspace/auth/server";

export const createProductHandler: RouteHandler<
  typeof createProductRoute
> = async (c) => {
  //   const session = await auth.api.getSession({ headers: c.req.raw.headers });
  //   console.log(session);
  //   if (!session?.user) {
  //     return c.json({ message: "Not" });
  //   }
  return c.json({ message: "OK" });
};
