import { OpenAPIHono } from "@hono/zod-openapi";
import { defaultHook } from "@workspace/open-api/lib/open-api-configuration";
import { registrationRoute, registrationOtpRoute } from "./better-routes";
import { registrationHandler, registrationOtpHandler } from "./better-handler";

const app = new OpenAPIHono({
  defaultHook,
});

app
  .openapi(registrationRoute, registrationHandler)
  .openapi(registrationOtpRoute, registrationOtpHandler);

export default app;
