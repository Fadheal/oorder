"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { useQuery } from "@tanstack/react-query"

import SidebarAdmin from "../components/Sidebar"
import Topbar from "../components/Topbar"
import OrdersCard from "./components/OrdersCard"

type Order = {
  id: string
  orderCode: number
  status: "paid" | "processed" | "completed" | "cancelled"
  total: number
  createdAt: string
  items: {
    id: string
    quantity: number
    price: number
    menu: {
      id: string
      name: string
    }
  }[]
}

function Page() {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery<Order[]>({
    queryKey: ["orders"],

    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`
      )

      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }

      return response.json()
    },

    refetchInterval: 3000,
  })

  return (
    <SidebarProvider>
      <SidebarAdmin activated={3} />

      <main className="w-full bg-accent">
        <Topbar />

        <div className="p-12">
          {isLoading && (
            <p className="text-sm text-muted-foreground">
              Loading orders...
            </p>
          )}

          {isError && (
            <p className="text-sm text-destructive">
              Failed to load orders.
            </p>
          )}

          {!isLoading && !isError && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {orders.map((order) => (
                <OrdersCard
                  key={order.id}
                  id={order.id}
                  orderCode={order.orderCode}
                  status={order.status}
                  createdAt={new Date(
                    order.createdAt
                  ).toLocaleString("id-ID")}
                  items={order.items.map((item) => ({
                    name: item.menu.name,
                    quantity: item.quantity,
                    price: item.price,
                  }))}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default Page