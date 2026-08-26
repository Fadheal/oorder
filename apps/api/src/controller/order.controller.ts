import type { Context } from "hono"
import { OrderServices } from "../services/order.services"

export const OrderController = {
  async getAll(c: Context) {
    const orders = await OrderServices.getAll()

    return c.json(orders)
  },

  async getById(c: Context) {
    const id = c.req.param("id")

    if (!id) {
      return c.json(
        {
          message: "order_id_is_required",
        },
        400
      )
    }

    const order = await OrderServices.getById(id)

    return c.json(order)
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

  async updateStatus(c: Context) {
    try {
      const id = c.req.param("id")

      if (!id) {
        return c.json(
          { message: "order_id_is_required" },
          400
        )
      }

      const body = await c.req.json<{
        status: "processed" | "completed"
      }>()

      const order = await OrderServices.updateStatus(
        id,
        body.status
      )

      return c.json({
        message: "order_status_updated",
        order,
      })
    } catch (error) {
      if (error instanceof Error) {
        return c.json(
          { message: error.message },
          400
        )
      }

      throw error
    }
  }
}