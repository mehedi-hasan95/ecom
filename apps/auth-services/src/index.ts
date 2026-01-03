import "dotenv/config";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import {
  defaultHook,
  openAPIConfiguration,
} from "@workspace/open-api/lib/open-api-configuration";
import { OpenAPIHono } from "@hono/zod-openapi";

// import RPC path
// import auth from "./auth";
import auth from "./auth/auth.index";
import betterAuth from "./better-auth/better-index";

const app = new OpenAPIHono({
  defaultHook,
}).basePath("/api/v1");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const routes = app.route("/better-auth", betterAuth);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  console.error("Unhandled error:", err);

  return c.json(
    {
      success: false,
      message: "Internal server error",
    },
    500
  );
});
serve(
  {
    fetch: app.fetch,
    port: 6001,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
openAPIConfiguration(app);
export default app;
export type AppType = typeof routes;
