"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type CartItem = {
  menuId: string
  name: string
  price: number
  image?: string | null
  quantity: number
}

type CartStore = {
  items: CartItem[]

  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (menuId: string) => void
  increase: (menuId: string) => void
  decrease: (menuId: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (cartItem) => cartItem.menuId === item.menuId
          )

          if (existing) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.menuId === item.menuId
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity + 1,
                    }
                  : cartItem
              ),
            }
          }

          return {
            items: [
              ...state.items,
              {
                ...item,
                quantity: 1,
              },
            ],
          }
        }),

      removeItem: (menuId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.menuId !== menuId
          ),
        })),

      increase: (menuId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.menuId === menuId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decrease: (menuId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.menuId === menuId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "oorder-cart",
    }
  )
)