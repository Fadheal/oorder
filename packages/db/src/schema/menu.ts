import { boolean, pgEnum, pgTable, text, integer, uuid } from "drizzle-orm/pg-core";

export const menuCategory = pgEnum("menu_category", [
  "food",
  "snack",
  "drink",
])

export const menu = pgTable("menu", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  category: menuCategory("category").notNull(),
  price: integer("price").notNull(),
  image: text("image"),
  avaliable: boolean("avaliable").default(true).notNull(),
})