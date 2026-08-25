"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { DataTableFeatures } from "./data-table-features"

export type Items = {
  id: string
  image: string
  name: string
  category: string
  price: number
}

const columnHelper = createColumnHelper<DataTableFeatures, Items>()

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
  columnHelper.accessor("price", {
    header: "Price",
  }),
])