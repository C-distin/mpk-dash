import "dotenv/config"
import { loadEnvConfig } from "@next/env"
import { defineConfig } from "drizzle-kit"

loadEnvConfig(process.cwd())

const connectionString = process.env.DATABASE_URL as string

export default defineConfig({
  out: "./lib/db/drizzle",
  schema: "./lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
})
