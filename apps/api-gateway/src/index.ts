import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { proxy } from "hono/proxy";
import { rateLimiter } from "hono-rate-limiter";
import { logger } from "hono/logger";

const app = new Hono().basePath("/api/v1");

app.get("/", (c) => {
  return c.text("wellcome to api gateway!");
});

app.use(logger());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.all("/auth-services/*", () => {
  return proxy("http://localhost:6001");
});

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: (req: any) => (req.user ? 1000 : 100), // Customize limit based on user status
  message: { error: "Too many requests, please try again later" },
  standardHeaders: true,
  keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "", // Use IP address as key
});
app.use(limiter);

serve(
  {
    fetch: app.fetch,
    port: 8080,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
