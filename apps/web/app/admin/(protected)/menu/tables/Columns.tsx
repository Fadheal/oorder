"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { DataTableFeatures } from "./data-table-features"
import { Switch } from "@/components/ui/switch"
import MenuActions from "./components/Action"

export type Items = {
  id: string
  image: string
  name: string
  category: "food" | "snack" | "drink"
  avaliable: boolean
  price: number
}

const columnHelper =
  createColumnHelper<DataTableFeatures, Items>()

export const columns = columnHelper.columns([
  columnHelper.accessor("image", {
    header: "Image",
  }),

  columnHelper.accessor("name", {
    header: "Name",
  }),

  columnHelper.accessor("category", {
    header: "Category",
  }),

  columnHelper.accessor("avaliable", {
    header: "Available",

    cell: ({ row }) => {
      const menu = row.original

      return (
        <Switch
          checked={menu.avaliable}
          onCheckedChange={async (checked) => {
            const response = await fetch(
              `http://localhost:3001/api/menu/${menu.id}`,
              {
                method: "PATCH",

                headers: {
                  "Content-Type": "application/json",
                },

                body: JSON.stringify({
                  avaliable: checked,
                }),
              }
            )

            if (!response.ok) {
              throw new Error(
                "Failed to update availability"
              )
            }
          }}
        />
      )
    },
  }),

  columnHelper.accessor("price", {
    header: "Price",

    cell: ({ getValue }) => (
      <span>
        Rp {getValue().toLocaleString("id-ID")}
      </span>
    ),
  }),

  columnHelper.display({
    id: "actions",
    header: "Action",

    cell: ({ row }) => (
      <MenuActions menu={row.original} />
    ),
  }),
])