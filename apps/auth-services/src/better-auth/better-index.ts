import { OpenAPIHono } from "@hono/zod-openapi";
import { defaultHook } from "@workspace/open-api/lib/open-api-configuration";
import { betterCreateRoute } from "./better-routes";
import { betterCreateHandler } from "./better-handler";

const app = new OpenAPIHono({
  defaultHook,
});

app.openapi(betterCreateRoute, betterCreateHandler);

export default app;
