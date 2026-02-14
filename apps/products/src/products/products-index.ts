import { OpenAPIHono } from "@hono/zod-openapi";
import { defaultHook } from "@workspace/open-api/lib/open-api-configuration";
import { createProductRoute, getProductsRoute } from "./products-route";
import { createProductHandler, getProductsHandler } from "./products-handler";

const app = new OpenAPIHono({
  defaultHook: defaultHook,
});

app
  .openapi(createProductRoute, createProductHandler)
  .openapi(getProductsRoute, getProductsHandler);

export default app;
