import { OpenAPIHono } from "@hono/zod-openapi";
import { defaultHook } from "@workspace/open-api/lib/open-api-configuration";
import {
  registrationRoute,
  registrationOtpRoute,
  testRoute,
  verifyRegistrationRoute,
  loginRoute,
  loginSessionRoute,
} from "./auth-routes";
import {
  loginHandler,
  loginSessionHandler,
  registrationHandler,
  registrationOtpHandler,
  testHandler,
  verifyRegistrationHandler,
} from "./auth-handler";

const app = new OpenAPIHono({
  defaultHook,
});

app
  .openapi(registrationRoute, registrationHandler)
  .openapi(registrationOtpRoute, registrationOtpHandler)
  .openapi(verifyRegistrationRoute, verifyRegistrationHandler)
  .openapi(loginRoute, loginHandler)
  .openapi(loginSessionRoute, loginSessionHandler)
  .openapi(testRoute, testHandler);

export default app;
