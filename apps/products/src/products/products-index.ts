import { OpenAPIHono } from "@hono/zod-openapi";
import { defaultHook } from "@workspace/open-api/lib/open-api-configuration";
import { createProductRoute } from "./products-route";
import { createProductHandler } from "./products-handler";

const app = new OpenAPIHono({
  defaultHook: defaultHook,
});

app.openapi(createProductRoute, createProductHandler);

export default app;
