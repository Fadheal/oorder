import { MenuRepository } from "../repositories/menu.repository"
import { OrdersRepository } from "../repositories/orders.repository"

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

  async create(data: CreateOrderInput) {
    if (!data.items.length) {
      throw new Error("order_must_contain_at_least_one_item")
    }

    let total = 0

    const orderCode = Math.floor(1000 + Math.random() * 9000)

    const order = await OrdersRepository.create({
      orderCode,
      status: "pending_payment",
      total
    })

    for (const item of data.items) {
      const menu = await MenuRepository.findById(item.menuId)

      if (!menu) {
        throw new Error('menu_is_not_found')
      }

      if (!menu.avaliable) {
        throw new Error(`${menu.name}_is_unavailable`)
      }

      if (item.quantity < 1) {
        throw new Error("quantity_must_be_at_least_1")
      }

      await OrdersRepository.createItems({
        orderId: order?.id,
        menuId: menu.id,
        quantity: item.quantity,
        price: menu.price
      })

      total += menu.price * item.quantity
    }
  }
}