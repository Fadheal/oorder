import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: ["./src/schema/schema.ts", "./src/schema/auth-schema.ts"],
  out: "./drizzle",
  dialect: "postgresql",

  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})