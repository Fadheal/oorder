import { MenuRepository } from "../repositories/menu.repository"
import { CheckoutRepository } from "../repositories/checkout.repository"
import { OrdersRepository } from "../repositories/orders.repository"
import { PaymentServices } from "./payment.services"

type CreateCheckoutInput = {
  items: {
    menuId: string
    quantity: number
  }[]
}

export const CheckoutServices = {
  async create(data: CreateCheckoutInput) {
    if (!data.items.length) {
      throw new Error("checkout_must_contain_at_least_one_item")
    }

    let total = 0

    const validatedItems: {
      menuId: string
      quantity: number
      price: number
    }[] = []

    for (const item of data.items) {
      const menu = await MenuRepository.findById(item.menuId)

      if (!menu) {
        throw new Error("menu_not_found")
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

  async confirm(checkoutId: string) {
    const checkout = await CheckoutRepository.findById(checkoutId)

    if (!checkout) {
      throw new Error("checkout_not_found")
    }

    const payment = await PaymentServices.getStatus(
      checkout.paymentId
    )

    const status = payment.transaction_status

    if (
      status !== "settlement" &&
      status !== "capture"
    ) {
      throw new Error("payment_not_completed")
    }

    const orderCode = Math.floor(
      1000 + Math.random() * 9000
    )

    const order = await OrdersRepository.create({
      orderCode,
      total: checkout.total,
      status: "paid",
    })

    if (!order) {
      throw new Error("failed_to_create_order")
    }

    for (const item of checkout.items) {
      await OrdersRepository.createItems({
        orderId: order.id,
        menuId: item.menuId,
        quantity: item.quantity,
        price: item.price,
      })
    }

    await CheckoutRepository.delete(checkout.id)

    return order
  },
}