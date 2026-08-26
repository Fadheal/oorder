"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { useQuery } from "@tanstack/react-query"
import {
  Banknote,
  ChartNoAxesCombinedIcon,
  Clock,
  HandbagIcon,
  ScrollText,
} from "lucide-react"

import SidebarAdmin from "../components/Sidebar"
import Topbar from "../components/Topbar"

type Order = {
  id: string
  orderCode: number
  status:
    | "paid"
    | "processed"
    | "completed"
    | "cancelled"
    | "pending_payment"
  total: number
  createdAt: string
}

type SummaryCardProps = {
  title: string
  value: string
  icon: React.ReactNode
  iconClassName: string
  badge?: string
}

function SummaryCard({
  title,
  value,
  icon,
  iconClassName,
  badge,
}: SummaryCardProps) {
  return (
    <div className="flex h-52 flex-col justify-between rounded-2xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={`flex size-12 items-center justify-center rounded-full ${iconClassName}`}
        >
          {icon}
        </div>

        {badge && (
          <div className="flex items-center gap-1.5 rounded-full border border-green-600/10 bg-green-600/10 px-2.5 py-1 text-xs font-medium text-green-600">
            <ChartNoAxesCombinedIcon className="size-3.5" />
            {badge}
          </div>
        )}
      </div>

      <div>
        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <h2 className="mt-1 text-3xl font-semibold tracking-tight">
          {value}
        </h2>
      </div>
    </div>
  )
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

  const today = new Date()

  const todayOrders = orders.filter((order) => {
    const createdAt = new Date(order.createdAt)

    return (
      createdAt.getFullYear() === today.getFullYear() &&
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getDate() === today.getDate()
    )
  })

  const validOrders = orders.filter(
    (order) =>
      order.status === "paid" ||
      order.status === "processed" ||
      order.status === "completed"
  )

  const totalRevenue = validOrders.reduce(
    (sum, order) => sum + order.total,
    0
  )

  const totalOrders = orders.length

  const averageOrderValue =
    validOrders.length > 0
      ? totalRevenue / validOrders.length
      : 0

  const hourCount: Record<number, number> = {}

  for (const order of todayOrders) {
    const hour = new Date(order.createdAt).getHours()

    hourCount[hour] = (hourCount[hour] ?? 0) + 1
  }

  const peakHourEntry = Object.entries(hourCount).sort(
    (a, b) => b[1] - a[1]
  )[0]

  const peakHour = peakHourEntry
    ? `${String(Number(peakHourEntry[0])).padStart(2, "0")}:00`
    : "-"

  return (
    <SidebarProvider>
      <SidebarAdmin activated={1} />

      <main className="min-h-screen w-full bg-accent">
        <Topbar />

        <div className="space-y-8 p-12">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight">
              Today's Summary
            </h1>

            <p className="text-muted-foreground">
              Here's what's happening right now.
            </p>
          </div>

          {isLoading && (
            <p className="text-sm text-muted-foreground">
              Loading summary...
            </p>
          )}

          {isError && (
            <p className="text-sm text-destructive">
              Failed to load dashboard data.
            </p>
          )}

          {!isLoading && !isError && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                title="Total Revenue"
                value={`Rp${Math.round(
                  totalRevenue
                ).toLocaleString("id-ID")}`}
                icon={<Banknote className="size-6" />}
                iconClassName="bg-green-600/10 text-green-600"
              />

              <SummaryCard
                title="Total Orders"
                value={`${totalOrders} Orders`}
                icon={<ScrollText className="size-6" />}
                iconClassName="bg-yellow-600/10 text-yellow-600"
              />

              <SummaryCard
                title="Avg. Order Value"
                value={`Rp${Math.round(
                  averageOrderValue
                ).toLocaleString("id-ID")}`}
                icon={<HandbagIcon className="size-6" />}
                iconClassName="bg-blue-600/10 text-blue-600"
              />

              <SummaryCard
                title="Peak Hour"
                value={peakHour}
                icon={<Clock className="size-6" />}
                iconClassName="bg-gray-600/10 text-gray-600"
              />
            </div>
          )}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default Page