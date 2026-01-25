import { OpenAPIHono } from "@hono/zod-openapi";
import { defaultHook } from "@workspace/open-api/lib/open-api-configuration";
import { stripeConnectRoute, stripeWebhookRoute } from "./stripe-route";
import { stripeConnectHandler, stripeWebhookHandler } from "./stripe-handler";

const app = new OpenAPIHono({
  defaultHook: defaultHook,
});

app
  .openapi(stripeConnectRoute, stripeConnectHandler)
  .openapi(stripeWebhookRoute, stripeWebhookHandler);

export default app;
