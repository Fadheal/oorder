"use client"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useQueryClient } from "@tanstack/react-query"

import EditMenuDialog, {
  type MenuFormValues,
} from "../../components/EditMenuDialog"

import type { Items } from "../Columns"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"

interface MenuActionsProps {
  menu: Items
}

function MenuActions({ menu }: MenuActionsProps) {
  const [editOpen, setEditOpen] = useState(false)

  const queryClient = useQueryClient()

  const handleEdit = async (data: MenuFormValues) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/menu/${menu.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      }
    )

    if (!response.ok) {
      throw new Error("Failed to update menu")
    }

    await queryClient.invalidateQueries({
      queryKey: ["menus"],
    })
  }

  async function handleDelete() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/menu/${menu.id}`,
      {
        method: "DELETE",
      }
    )

    if (!response.ok) {
      throw new Error("Failed to delete menu")
    }

    await queryClient.invalidateQueries({
      queryKey: ["menus"],
    })
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          className="w-8 aspect-square p-5"
          onClick={() => setEditOpen(true)}
        >
          <Pencil className="size-4" />
        </Button>

        <AlertDialog>
          <AlertDialogTrigger
            className="
              flex size-10 items-center justify-center
              rounded-xl bg-red-700 text-primary-foreground
              transition-colors hover:bg-red-600
            "
          >
            <Trash2 className="size-4" />
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete {menu.name}?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This menu will be permanently deleted. This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                variant="destructive"
                onClick={handleDelete}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <EditMenuDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        menu={{
          name: menu.name,
          category: menu.category,
          price: menu.price,
          image: menu.image,
          avaliable: menu.avaliable
        }}
        onSubmit={handleEdit}
      />
    </>
  )
}

export default MenuActions