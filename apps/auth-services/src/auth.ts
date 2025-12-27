import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "@workspace/db";
import { StatusErrors } from "@workspace/status-message";
import { registrationSchema } from "@workspace/schemas";
import {
  checkOtpRestrictions,
  sendOtp,
  trackOtpRequest,
} from "./utils/auth.helper";

const app = new Hono()
  .get("/", (c) => c.json("list books"))
  .post("/", zValidator("json", registrationSchema), async (c) => {
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
  });

export default app;
