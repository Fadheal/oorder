import type { Context } from "hono"
import { CheckoutServices } from "../services/checkout.services"

export const CheckoutController = {
  async create(c: Context) {
    try {
      const body = await c.req.json()

      const result = await CheckoutServices.create(body)

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

  async confirm(c: Context) {
    try {
      const id = c.req.param("id")

      if (!id) {
        return c.json(
          {
            message: "checkout_id_required",
          },
          400
        )
      }

      const order = await CheckoutServices.confirm(id)

      return c.json({
        order,
      })
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