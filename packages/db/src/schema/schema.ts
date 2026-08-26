import { boolean, pgEnum, pgTable, text, integer, uuid, timestamp } from "drizzle-orm/pg-core";

export const menuCategory = pgEnum("menu_category", [
  "food",
  "snack",
  "drink",
])

export const orderStatus = pgEnum("order_status", [
  "pending_payment",
  "paid",
  "processed",
  "completed",
  "cancelled",
])

export const menu = pgTable("menu", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  category: menuCategory("category").notNull(),
  price: integer("price").notNull(),
  image: text("image"),
  avaliable: boolean("avaliable").default(true).notNull(),
})

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderCode: integer("order_code").notNull(),
  status: orderStatus("status").default("pending_payment").notNull(),
  total: integer("total").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").notNull().references(() => orders.id, {
    onDelete: "cascade"
  }),
  menuId: uuid("menu_id").notNull().references(() => menu.id),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
})