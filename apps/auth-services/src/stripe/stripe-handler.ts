import { RouteHandler } from "@hono/zod-openapi";
import { stripeConnectRoute, stripeWebhookRoute } from "./stripe-route";
import Stripe from "stripe";
import { auth } from "@workspace/auth/server";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});
export const stripeConnectHandler: RouteHandler<
  typeof stripeConnectRoute
> = async (c) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session?.user) {
    return c.json({ message: "Unauthorize User" }, 401);
  }
  const createAccount = await stripeClient.accounts.create({
    email: session.user.email,
    type: "express",
  });
  const linksAccount = await stripeClient.accountLinks.create({
    account: createAccount.id,
    type: "account_onboarding",
    refresh_url: "http://localhost:3000",
    return_url: "http://localhost:3000",
  });
  return c.json({ url: linksAccount.url });
};

export const stripeWebhookHandler: RouteHandler<
  typeof stripeWebhookRoute
> = async (c) => {
  console.log("🔥 Stripe webhook HIT");
  const signature = c.req.header("stripe-signature");
  if (!signature) {
    return c.text("Missing stripe-signature", 400);
  }

  const body = await c.req.text();

  let event: Stripe.Event;

  try {
    event = stripeClient.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return c.text("Webhook Error", 400);
  }

  if (event.type === "account.updated") {
    const account = event.data.object as Stripe.Account;
    console.log(account);
  }
  return c.json({ received: true });
};
