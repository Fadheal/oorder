"use client"

import {
  type ColumnDef,
  type RowData,
  useTable,
} from "@tanstack/react-table"

import {
  type DataTableFeatures,
  features,
} from "./data-table-features"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Delete, EditIcon, MoreHorizontal, Plus, Trash } from "lucide-react"

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
}

function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data,
    columns,
  })

  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h2 className="text-base font-semibold">
            Menu Items
          </h2>

          <p className="mt-0.5 text-sm text-muted-foreground">
            {table.getRowModel().rows.length} items available
          </p>
        </div>

        <Button className="p-4 gap-2">
          <Plus className="size-4" />
          Add Menu
        </Button>
      </div>

      <Table className="[&_th]:px-6 [&_td]:px-6">
        <TableHeader className="bg-muted/30">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="h-11 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </TableHead>
              ))}

              <TableHead className="h-11 w-[90px] text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Action
              </TableHead>
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="group transition-colors hover:bg-muted/30"
              >
                {row.getVisibleCells().map((cell) =>
                  cell.column.id === "image" ? (
                    <TableCell
                      key={cell.id}
                      className="py-3"
                    >
                      <img
                        src={cell.getValue() as string}
                        alt="Food"
                        className="size-12 rounded-lg border bg-muted object-cover"
                      />
                    </TableCell>
                  ) : (
                    <TableCell
                      key={cell.id}
                      className="py-4 text-sm text-foreground"
                    >
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  )
                )}

                <TableCell className="space-x-2">
                  <Button
                    variant="destructive"
                    className="rounded-full h-9 w-9"
                  >
                    <Trash className="w-2" />
                  </Button>
                  <Button
                    variant="default"
                    className="rounded-full h-9 w-9"
                  >
                    <EditIcon className="w-2" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="h-40 text-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                    <Plus className="size-4 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      No menu items
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Add your first menu item to get started.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default DataTable