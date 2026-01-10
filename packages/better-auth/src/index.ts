import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@workspace/db";
import redis from "@workspace/redis";
import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // Important: Explicitly set your base URL if Hono is running on 6001
  baseURL: "http://localhost:6001",

  emailAndPassword: {
    enabled: true,
    maxPasswordLength: 64,
    minPasswordLength: 6,
    requireEmailVerification: true,
  },

  advanced: {
    // This allows the cookie to be sent to /api/session even if
    // the auth routes are under /api/auth
    defaultCookieAttributes: {
      path: "/",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      partitioned: false,
    },
    cookies: {
      sessionToken: {
        attributes: {
          path: "/",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          secure: process.env.NODE_ENV === "production",
          partitioned: false,
        },
      },
    },
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          console.log("Better auth OTP: ", otp);
        }
      },
    }),
  ],

  user: {
    additionalFields: {
      role: {
        type: ["USER", "SELLER"],
        required: false,
        defaultValue: "USER",
      },
      phone: {
        type: "string",
        required: false,
        defaultValue: undefined,
      },
    },
  },

  secondaryStorage: {
    get: async (key) => {
      return await redis.get(key);
    },
    set: async (key, value, ttl) => {
      if (ttl) {
        await redis.set(key, value, "EX", ttl);
      } else {
        await redis.set(key, value);
      }
    },
    delete: async (key) => {
      await redis.del(key);
    },
  },

  // Ensure both ports are trusted
  trustedOrigins: ["http://localhost:3000", "http://localhost:6001"],
});
