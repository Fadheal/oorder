"use client"

import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Clock3 } from "lucide-react"

type OrderStatus =
  | "paid"
  | "processed"
  | "completed"
  | "cancelled"

type OrderItem = {
  name: string
  quantity: number
  price: number
}

interface OrdersCardProps {
  id: string
  orderCode: number
  status: OrderStatus
  createdAt: string
  items: OrderItem[]
}

const statusStyle = {
  paid: {
    label: "Paid",
    className:
      "border-yellow-500/20 bg-yellow-500/10 text-yellow-600",
    accent: "bg-yellow-500",
  },

  processed: {
    label: "Processing",
    className:
      "border-blue-500/20 bg-blue-500/10 text-blue-600",
    accent: "bg-blue-500",
  },

  completed: {
    label: "Completed",
    className:
      "border-green-500/20 bg-green-500/10 text-green-600",
    accent: "bg-green-500",
  },

  cancelled: {
    label: "Cancelled",
    className:
      "border-red-500/20 bg-red-500/10 text-red-600",
    accent: "bg-red-500",
  },
}

function OrdersCard({
  id,
  orderCode,
  status,
  createdAt,
  items,
}: OrdersCardProps) {
  const queryClient = useQueryClient()

  const currentStatus = statusStyle[status]

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const mutation = useMutation({
    mutationFn: async (
      status: "processed" | "completed"
    ) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      )

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text)
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["orders"],
      })

      await queryClient.invalidateQueries({
        queryKey: ["order", id],
      })
    },
  })

  function handleProceed() {
    if (status === "paid") {
      mutation.mutate("processed")
      return
    }

    if (status === "processed") {
      mutation.mutate("completed")
    }
  }

  return (
    <div className="relative w-full max-w-95 overflow-hidden rounded-xl border bg-background shadow-sm">
      <div
        className={`absolute bottom-0 left-0 top-0 w-1.5 ${currentStatus.accent}`}
      />

      <div className="space-y-5 p-5 pl-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Order
              </p>

              <h2 className="text-2xl font-bold tracking-tight">
                Order #{orderCode}
              </h2>
            </div>

            <div
              className={`rounded-full border px-2.5 py-1 text-xs font-medium ${currentStatus.className}`}
            >
              {currentStatus.label}
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock3 className="size-3.5" />
            {createdAt}
          </div>
        </div>

        <div className="space-y-3 border-t pt-4">
          {items.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="font-bold text-primary">
                  {item.quantity}x
                </span>

                <span className="truncate text-sm font-medium">
                  {item.name}
                </span>
              </div>

              <span className="shrink-0 text-sm text-muted-foreground">
                Rp{item.price.toLocaleString("id-ID")}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-sm text-muted-foreground">
            Total
          </span>

          <span className="font-bold">
            Rp{total.toLocaleString("id-ID")}
          </span>
        </div>

        {(status === "paid" || status === "processed") && (
          <Button
            className="h-11 w-full rounded-lg"
            disabled={mutation.isPending}
            onClick={handleProceed}
          >
            {mutation.isPending
              ? "Updating..."
              : status === "paid"
                ? "Start Processing"
                : "Mark as Completed"}
          </Button>
        )}

        {mutation.isError && (
          <p className="text-center text-xs text-destructive">
            {mutation.error.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default OrdersCard