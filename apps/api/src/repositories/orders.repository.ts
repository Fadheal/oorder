import { db, eq, orderItems, orders } from "@repo/db"

export const OrdersRepository = {
  findAll() {
    return db.query.orders.findMany({
      orderBy: (orders, { desc }) => [desc(orders.createdAt)],
      with: {
        items: {
          with: {
            menu: true,
          },
        },
      },
    })
  },

  async findById(id: string) {
    return db.query.orders.findFirst({
      where: eq(orders.id, id),
      with: {
        items: {
          with: {
            menu: true,
          },
        },
      },
    })
  },

  async create(data: typeof orders.$inferInsert) {
    const [order] = await db
      .insert(orders)
      .values(data)
      .returning()

    if (!order) {
      throw new Error("Failed to create order")
    }

    return order
  },

  async createItems(data: typeof orderItems.$inferInsert) {
    const [item] = await db
      .insert(orderItems)
      .values(data)
      .returning()

    return item
  },

  update(
    id: string,
    data: Partial<typeof orders.$inferInsert>
  ) {
    return db
      .update(orders)
      .set(data)
      .where(eq(orders.id, id))
      .returning()
  },

  remove(id: string) {
    return db
      .delete(orders)
      .where(eq(orders.id, id))
      .returning()
  }
}