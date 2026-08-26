import { CheckoutRepository } from "../repositories/checkout.repository"
import { MenuRepository } from "../repositories/menu.repository"
import { OrdersRepository } from "../repositories/orders.repository"
import { PaymentServices } from "./payment.services"

type CreateOrderInput = {
  items: {
    menuId: string
    quantity: number
  }[]
}

export const OrderServices = {
  getAll() {
    return OrdersRepository.findAll()
  },

  async getById(id: string) {
    const order = await OrdersRepository.findById(id)

    if (!order) {
      throw new Error("order_not_found")
    }

    return order
  },

  async create(data: CreateOrderInput) {
    if (!data.items.length) {
      throw new Error("order_must_contain_at_least_one_item")
    }

    let total = 0

    const validatedItems = []

    for (const item of data.items) {
      const menu = await MenuRepository.findById(item.menuId)

      if (!menu) {
        throw new Error("menu_is_not_found")
      }

      if (!menu.avaliable) {
        throw new Error(`${menu.name}_is_unavailable`)
      }

      if (item.quantity < 1) {
        throw new Error("quantity_must_be_at_least_1")
      }

      total += menu.price * item.quantity

      validatedItems.push({
        menuId: menu.id,
        quantity: item.quantity,
        price: menu.price,
      })
    }

    const paymentId = crypto.randomUUID()

    const checkout = await CheckoutRepository.create({
      paymentId,
      total,
      items: validatedItems,
    })

    if (!checkout) {
      throw new Error("failed_to_create_checkout")
    }

    const payment = await PaymentServices.create({
      paymentId,
      amount: total,
    })

    return {
      checkoutId: checkout.id,
      payment: {
        token: payment.token,
        url: payment.url,
      },
    }
  },

  async updateStatus(
    id: string,
    status: "processed" | "completed"
  ) {
    const order = await OrdersRepository.findById(id)

    if (!order) {
      throw new Error("order_not_found")
    }

    const updatedOrder = await OrdersRepository.updateStatus(
      id,
      status
    )

    if (!updatedOrder) {
      throw new Error("failed_to_update_order")
    }

    return updatedOrder
  },
}