import { auth } from "@workspace/auth/server";
import { createMiddleware } from "hono/factory";

type Env = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

export const authMiddleware = createMiddleware<Env>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  console.log(session);
  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return c.json({ message: "Unauthorize" }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});
