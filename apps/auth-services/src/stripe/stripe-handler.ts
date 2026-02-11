import { RouteHandler } from "@hono/zod-openapi";
import { stripeConnectRoute, stripeWebhookRoute } from "./stripe-route";
import Stripe from "stripe";
import { auth } from "@workspace/auth/server";
import { prisma } from "@workspace/db";

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
  console.log("hit");
  const signature = c.req.header("stripe-signature");
  console.log(signature);
  if (!signature) {
    return c.json({ error: "Missing Stripe signature" }, 400);
  }
  return c.json({ received: true }, 200);
};
