import redis from "@workspace/redis";
import { StatusErrors } from "@workspace/status-message";
import crypto from "crypto";
import { email } from "zod/v4";

export const checkOtpRestrictions = async (email: string) => {
  if (await redis.get(`otp_lock:${email}`)) {
    return StatusErrors.TooManyRequest(
      "Account lock dut to multiple failed attemps! Please try again later"
    );
  }

  if (await redis.get(`otp_spam_lock:${email}`)) {
    return StatusErrors.TooManyRequest(
      "Too many API request! Please try again after 1 hour"
    );
  }

  if (await redis.get(`otp_cooldown:${email}`)) {
    return StatusErrors.TooManyRequest(
      "Please wail 1 minute before requestin new OTP"
    );
  }
};

export const sendOtp = async (email: string) => {
  const otp = crypto.randomInt(1000, 9999).toString();
  // to-do: sent opt to the email
  // like await sendMail(emailAddress, emailType, senderName, otp) here the otp will be otp
  const otps = await redis.set(`otp: ${email}`, otp, "EX", 300);
  const timed = await redis.set(`otp_cooldown:${email}`, "true", "EX", 60);
  return {
    otps,
    timed,
  };
};

export const trackOtpRequest = async (email: string) => {
  const otpRequestKey = `otp_request_count:${email}`;
  let otpRequests = parseInt((await redis.get(otpRequestKey)) || "0");
  if (otpRequests >= 3) {
    await redis.set(`otp_spam_lock:${email}`, "locked", "EX", 3600);
    return StatusErrors.TooManyRequest(
      "Too many api request. Please try after 1 hour"
    );
  }
  await redis.set(otpRequestKey, otpRequests + 1, "EX", 3600);
};
