import { createRoute } from "@hono/zod-openapi";

const tags = ["Stripe"];
export const stripeConnectRoute = createRoute({
  method: "post",
  path: "/connect",
  tags,
  responses: {
    201: { description: "OK" },
    401: { description: "Unauthorize" },
    500: { description: "Internal server error" },
  },
});

export const stripeWebhookRoute = createRoute({
  method: "post",
  path: "/webhook",
  tags,
  responses: {
    201: { description: "OK" },
    401: { description: "Unauthorize" },
    500: { description: "Internal server error" },
  },
});
