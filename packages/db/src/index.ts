import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
export * from "./schema/menu"
export { eq } from "drizzle-orm"

const client = postgres(process.env.DATABASE_URL!)

export const db = drizzle(client)