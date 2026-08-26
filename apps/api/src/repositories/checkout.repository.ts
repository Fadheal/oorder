import {
  checkoutSessions,
  db,
  eq
} from "@repo/db"

export const CheckoutRepository = {
  async create(
    data: typeof checkoutSessions.$inferInsert
  ) {
    const [checkout] = await db
      .insert(checkoutSessions)
      .values(data)
      .returning()

    return checkout
  },

  async findById(id: string) {
    const [checkout] = await db
      .select()
      .from(checkoutSessions)
      .where(eq(checkoutSessions.id, id))
      .limit(1)

    return checkout
  },

  async delete(id: string) {
    return db
      .delete(checkoutSessions)
      .where(eq(checkoutSessions.id, id))
  },
}