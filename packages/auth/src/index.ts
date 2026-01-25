import { prisma } from "@workspace/db";
import redis from "@workspace/redis";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { customSession, emailOTP } from "better-auth/plugins";
import { sendVerificationEmail } from "./send-email/send-verification-email";

const options = {
  baseURL: process.env.BETTER_AUTH_URL,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    maxPasswordLength: 64,
    requireEmailVerification: true,
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          await sendVerificationEmail("verification", email, otp);
        }
        if (type === "forget-password") {
          await sendVerificationEmail("reset", email, otp);
        }
      },
      disableSignUp: false,
    }),
    nextCookies(),
  ],
  advanced: {
    defaultCookieAttributes: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      partitioned: false,
    },
    cookies: {
      sessionToken: {
        attributes: {
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          secure: process.env.NODE_ENV === "production",
          partitioned: false,
        },
      },
    },
  },
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
      stripeVerified: {
        type: "boolean",
        required: false,
        defaultValue: false,
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
  trustedOrigins: ["http://localhost:3000", "http://localhost:6001"],
} satisfies BetterAuthOptions;

export const auth = betterAuth({
  ...options,
  plugins: [
    ...(options.plugins ?? []),
    customSession(async ({ user, session }, ctx) => {
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          stripeVerified: user.stripeVerified,
        },
        session: { token: session.token },
      };
    }, options),
  ],
});
