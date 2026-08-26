import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema/schema"
export * from "./schema/schema"
export { eq } from "drizzle-orm"

const client = postgres(process.env.DATABASE_URL!)

export const db = drizzle(client, {
  schema
})