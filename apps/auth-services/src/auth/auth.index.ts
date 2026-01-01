import { OpenAPIHono } from "@hono/zod-openapi";
import { authCreateRoute, authGetRoute } from "./auth.route";
import { authCreateHandler, authGetHandler } from "./auth.handler";
import { defaultHook } from "@workspace/open-api/lib/open-api-configuration";

const app = new OpenAPIHono({
  defaultHook,
});

app
  .openapi(authGetRoute, authGetHandler)
  .openapi(authCreateRoute, authCreateHandler);

export default app;
