import { RouteHandler } from "@hono/zod-openapi";
import { authCreateRoute, authGetRoute } from "./auth.route";
import { prisma } from "@workspace/db";
import { StatusErrors } from "@workspace/status-message";
import { checkOtpRestrictions, sendOtp, trackOtpRequest } from "./auth.helper";

export const authGetHandler: RouteHandler<typeof authGetRoute> = async (c) => {
  return c.json(
    {
      message: "Mehedi",
    },
    200
  );
};

export const authCreateHandler: RouteHandler<typeof authCreateRoute> = async (
  c
) => {
  const data = c.req.valid("json");
  const userExist = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (userExist) {
    throw StatusErrors.Conflict("This email already exist!");
  }
  const otprestriction = await checkOtpRestrictions(data.email);
  const otpRequests = await trackOtpRequest(data.email);
  const otp = await sendOtp(data.email);
  return c.json(
    {
      message: "Hello there",
      status: "OK",
      otprestriction,
      otpRequests,
      otp,
    },
    201
  );
};
