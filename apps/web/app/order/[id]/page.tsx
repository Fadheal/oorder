"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

export default function OrderTrackerPage() {
  const params = useParams()

  const id = params.id as string

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", id],

    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`
      )

      if (!response.ok) {
        throw new Error("Failed to fetch order")
      }

      return response.json()
    },

    refetchInterval: 3000,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <main className="mx-auto max-w-lg space-y-6 p-6">
      <div>
        <p className="text-sm text-muted-foreground">
          Order
        </p>

        <h1 className="text-3xl font-bold">
          #{order.orderCode}
        </h1>
      </div>

      <div className="rounded-xl border p-5">
        <p className="text-sm text-muted-foreground">
          Status
        </p>

        <p className="mt-1 text-lg font-semibold">
          {order.status}
        </p>
      </div>

      <div className="space-y-3">
        {order.items.map((item: any) => (
          <div
            key={item.id}
            className="flex justify-between rounded-xl border p-4"
          >
            <div>
              <p className="font-medium">
                {item.menu.name}
              </p>

              <p className="text-sm text-muted-foreground">
                {item.quantity}x
              </p>
            </div>

            <p>
              Rp{(item.price * item.quantity).toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}