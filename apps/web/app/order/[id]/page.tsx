"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Check, Clock, PackageCheck, ChefHat } from "lucide-react"

import { capitalize } from "@/lib/formarter"

const steps = [
  {
    key: "paid",
    label: "Paid",
    icon: Check,
  },
  {
    key: "processed",
    label: "Processing",
    icon: ChefHat,
  },
  {
    key: "completed",
    label: "Completed",
    icon: PackageCheck,
  },
]

export default function OrderTrackerPage() {
  const params = useParams()
  const id = params.id as string

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
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

    enabled: !!id,
    refetchInterval: 3000,
  })

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading order...
        </p>
      </main>
    )
  }

  if (isError || !order) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Order not found.
        </p>
      </main>
    )
  }

  const currentStep = steps.findIndex(
    (step) => step.key === order.status
  )

  return (
    <main className="min-h-screen bg-muted/30 p-6 md:p-12">
      <div className="mx-auto max-w-3xl space-y-6">

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Order Tracker
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Order #{order.orderCode}
          </h1>
        </div>

        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Current Status
              </p>

              <div className="mt-1 flex items-center gap-2">
                <div className="size-2.5 rounded-full bg-green-600" />

                <p className="text-xl font-semibold">
                  {capitalize(order.status)}
                </p>
              </div>
            </div>

            <div className="rounded-full bg-muted px-3 py-1 text-sm">
              #{order.orderCode}
            </div>
          </div>

          <div className="mt-8 flex items-center">
            {steps.map((step, index) => {
              const Icon = step.icon

              const active = index <= currentStep

              return (
                <div
                  key={step.key}
                  className="flex flex-1 items-center last:flex-none"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={[
                        "flex size-10 items-center justify-center rounded-full border transition-colors",
                        active
                          ? "border-green-600 bg-green-600 text-white"
                          : "bg-background text-muted-foreground",
                      ].join(" ")}
                    >
                      <Icon className="size-4" />
                    </div>

                    <span className="text-xs font-medium">
                      {step.label}
                    </span>
                  </div>

                  {index !== steps.length - 1 && (
                    <div
                      className={[
                        "mx-3 h-0.5 flex-1",
                        index < currentStep
                          ? "bg-green-600"
                          : "bg-border",
                      ].join(" ")}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="font-semibold">
              Order Details
            </h2>

            <p className="text-sm text-muted-foreground">
              Items included in this order.
            </p>
          </div>

          <div className="divide-y">
            {order.items?.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-4 px-6 py-4"
              >
                {item.menu?.image && (
                  <img
                    src={item.menu.image}
                    alt={item.menu.name}
                    className="size-14 rounded-xl object-cover"
                  />
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {item.menu?.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {item.quantity} × Rp
                    {item.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <p className="font-medium">
                  Rp
                  {(item.price * item.quantity)
                    .toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t bg-muted/20 px-6 py-4">
            <span className="text-sm text-muted-foreground">
              Total
            </span>

            <span className="text-xl font-bold">
              Rp{order.total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4" />

          <span>
            This page updates automatically every few seconds.
          </span>
        </div>

      </div>
    </main>
  )
}