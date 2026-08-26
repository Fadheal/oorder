import { db, menu, eq } from "@repo/db"

export const MenuRepository = {
  findAll() {
    return db.select().from(menu)
  },

  findById(id: string) {
    return db
      .select()
      .from(menu)
      .where(eq(menu.id, id))
      .then((rows) => rows[0] ?? null)
  },

  create(data: typeof menu.$inferInsert) {
    return db
      .insert(menu)
      .values(data)
      .returning()
  },

  update(
    id: string,
    data: Partial<typeof menu.$inferInsert>
  ) {
    return db
      .update(menu)
      .set(data)
      .where(eq(menu.id, id))
      .returning()
  },

  remove(id: string) {
    return db
      .delete(menu)
      .where(eq(menu.id, id))
      .returning()
  }
}