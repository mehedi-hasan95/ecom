import { createRoute, z } from "@hono/zod-openapi";

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
  path: "/webhooks",
  summary: "Stripe Webhook",
  request: {
    headers: z.object({
      "stripe-signature": z.string(),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.any().openapi({
            description: "Raw Stripe webhook payload",
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Webhook received",
      content: {
        "application/json": {
          schema: z.object({ received: z.boolean() }),
        },
      },
    },
    400: {
      description: "Webhook error",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});
