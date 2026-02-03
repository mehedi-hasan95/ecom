import { OpenAPIHono } from "@hono/zod-openapi";
import { defaultHook } from "@workspace/open-api/lib/open-api-configuration";
import { getCategoriesHandler, getCategoryHandler } from "./categories-handler";
import { getCategoriesRoute, getCategoryRoute } from "./categories-route";

const app = new OpenAPIHono({
  defaultHook: defaultHook,
});

app
  .openapi(getCategoriesRoute, getCategoriesHandler)
  .openapi(getCategoryRoute, getCategoryHandler);

export default app;
