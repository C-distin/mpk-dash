import argon2 from "argon2"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { admin, haveIBeenPwned, bearer } from "better-auth/plugins"
import { db } from "./db"
import * as schema from "./db/schema"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),

  experimental: {
    joins: true,
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    password: {
      hash: async (password: string) => {
        return await argon2.hash(password, {
          type: argon2.argon2i,
          hashLength: 50,
        })
      },

      verify: async ({ password, hash }: { password: string; hash: string }) => {
        return await argon2.verify(hash, password)
      },
    },
  },

  advanced: {
    cookiePrefix: "mpk-dashboard",
    useSecureCookies: true,
  },

  rateLimit: {
    enabled: true,
    window: 60,
    max: 10,
    storage: "database",
    modelName: "rateLimit",
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60, // 1 hour
      strategy: "jwt",
      refreshCache: {
        updateAge: 10 * 60,
      },
    },
  },

  user: {
    deleteUser: {
      enabled: true,
    },

    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
        input: false,
      },
    },
  },

  plugins: [
    nextCookies(),

    admin({
      defaultRole: "user",

      impersonationSessionDuration: 60 * 60, // 1 hour

      defaultBanReason: "You have been banned for violating our rules",
      defaultBanExpiresIn: undefined,
      bannedUserMessage: "Your account has been suspended, contact Evans for support",
    }),

    haveIBeenPwned({
      customPasswordCompromisedMessage: "Your password has been found in a data breach please create a new one",
    }),

    bearer(),
  ],
})
