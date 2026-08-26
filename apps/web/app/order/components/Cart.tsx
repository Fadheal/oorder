"use client"

import { useCartStore } from "@/stores/cart.store"
import {
  ChevronRight,
  Handbag,
  Minus,
  Plus,
  Trash2,
} from "lucide-react"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"

function Cart() {
  const items = useCartStore((state) => state.items)
  const increase = useCartStore((state) => state.increase)
  const decrease = useCartStore((state) => state.decrease)
  const removeItem = useCartStore((state) => state.removeItem)

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  if (totalItems === 0) return null

  return (
    <Drawer>
      <DrawerTrigger className="absolute bottom-4 left-4 right-4 flex h-14 items-center justify-between rounded-2xl bg-green-700 px-5 text-white shadow-lg transition-all hover:bg-green-600 active:scale-[0.98]">
        <div className="flex items-center gap-3">

          <div className="text-left">
            <p className="text-xs text-white/70">
              Your cart
            </p>

            <p className="text-sm font-semibold">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold">
            Rp{totalPrice.toLocaleString("id-ID")}
          </span>

          <ChevronRight className="size-4 text-white/70" />
        </div>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-lg space-y-4">
          <DrawerHeader>
            <DrawerTitle className='text-left font-semibold'>Your Cart</DrawerTitle>
            <DrawerDescription className='text-left'>
              Review your order before checkout.
            </DrawerDescription>
          </DrawerHeader>

          <div className="max-h-[55vh] space-y-2 overflow-y-auto px-4">
            {items.map((item) => (
              <div
                key={item.menuId}
                className="flex items-center gap-3 rounded-xl border p-3"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-16 shrink-0 rounded-lg object-cover"
                  />
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {item.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Rp{item.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => decrease(item.menuId)}
                  >
                    <Minus className="size-3.5" />
                  </Button>

                  <span className="w-5 text-center text-sm font-medium">
                    {item.quantity}
                  </span>

                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => increase(item.menuId)}
                  >
                    <Plus className="size-3.5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-destructive"
                    onClick={() => removeItem(item.menuId)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Total
              </span>

              <span className="text-lg font-bold">
                Rp{totalPrice.toLocaleString("id-ID")}
              </span>
            </div>

            <Button className="h-12 w-full bg-green-700 hover:bg-green-600">
              Continue to Payment
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default Cart