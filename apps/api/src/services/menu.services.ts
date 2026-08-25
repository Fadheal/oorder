import { create } from "node:domain"
import { MenuRepository } from "../repositories/menu.repository"

export const MenuService = {
  getAll() {
    return MenuRepository.findAll()
  },

  async getById(id: string) {
    const result = await MenuRepository.findById(id)

    return result[0] ?? null
  },

  async create(data: {
    name: string
    category: "food" | "snack" | "drink"
    price: number
    image?: string
    avaliable?: boolean
  }) {
    const result = await MenuRepository.create(data)

    return result[0]
  },

  async update(
    id: string,
    data: {
      name: string
      category: "food" | "snack" | "drink"
      price: number
      image?: string
      avaliable?: boolean
    }
  ) {
    const result = await MenuRepository.update(id, data)

    return result[0] ?? null
  },

  async remove(id: string) {
    const result = await MenuRepository.remove(id)

    return result[0] ?? null
  }
}