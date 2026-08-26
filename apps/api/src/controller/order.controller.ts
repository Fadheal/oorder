import type { Context } from "hono"
import { OrderServices } from "../services/order.services"

export const OrderController = {
  async getAll(c: Context) {
    const orders = await OrderServices.getAll()

    return c.json(orders)
  },

  async create(c: Context) {
    try {
      const body = await c.req.json()

      const result = await OrderServices.create(body)

      return c.json(result, 201)
    } catch (error) {
      if (error instanceof Error) {
        return c.json(
          {
            message: error.message,
          },
          400
        )
      }

      throw error
    }
  },
}