// index.ts
import { Hono } from "hono";
import stripe from "./stripe/stripe-index";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

const app = new Hono();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

const routes = app.route("/stripe", stripe);

serve(
  {
    fetch: app.fetch,
    port: 7001,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
export default app;
export type AppType = typeof routes;
