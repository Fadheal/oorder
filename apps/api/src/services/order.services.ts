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

    const orderCode = Math.floor(1000 + Math.random() * 9000)

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
        menu,
        quantity: item.quantity,
      })
    }

    const order = await OrdersRepository.create({
      orderCode,
      status: "pending_payment",
      total,
    })

    if (!order) {
      throw new Error("failed_to_create_order")
    }

    for (const item of validatedItems) {
      await OrdersRepository.createItems({
        orderId: order.id,
        menuId: item.menu.id,
        quantity: item.quantity,
        price: item.menu.price,
      })
    }

    const payment = await PaymentServices.create({
      orderId: order.id,
      amount: total,
    })

    return {
      order,
      payment: {
        sessionId: payment.payment_session_id,
        url: payment.payment_link_url,
      },
    }
  },
}