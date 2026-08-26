import { relations } from "drizzle-orm";
import { boolean, pgEnum, pgTable, text, integer, uuid, timestamp, jsonb } from "drizzle-orm/pg-core";

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

export const checkoutSessions = pgTable("checkout_sessions", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  paymentId: text("payment_id")
    .notNull()
    .unique(),

  total: integer("total")
    .notNull(),

  items: jsonb("items")
    .$type<
      {
        menuId: string
        quantity: number
        price: number
      }[]
    >()
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
})

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),

  menu: one(menu, {
    fields: [orderItems.menuId],
    references: [menu.id],
  }),
}))

export const menuRelations = relations(menu, ({ many }) => ({
  orderItems: many(orderItems),
}))