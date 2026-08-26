"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useForm } from "@tanstack/react-form-nextjs"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

type MenuCategory = "food" | "snack" | "drink"

export interface MenuFormValues {
  name: string
  category: MenuCategory
  price: number
  image: string
  avaliable: boolean
}

interface EditMenuDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: MenuFormValues) => void
  menu: MenuFormValues
}

function EditMenuDialog({
  open,
  onOpenChange,
  onSubmit,
  menu,
}: EditMenuDialogProps) {
  const form = useForm({
    defaultValues: menu,

    onSubmit: async ({ value }) => {
      await onSubmit(value)

      onOpenChange(false)
    },
  })

  useEffect(() => {
    if (open) {
      form.reset(menu)
    }
  }, [open, menu])

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit Menu</DialogTitle>

            <DialogDescription>
              Update menu information.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => (
                <Field>
                  <Label>Name</Label>

                  <Input
                    id="name"
                    name="name"
                    type="text"
                    className="border border-black/10"
                    placeholder="Es Tung Tung"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />
                </Field>
              )}
            />

            <form.Field
              name="category"
              children={(field) => (
                <Field>
                  <Label>Category</Label>

                  <Select
                    value={field.state.value}
                    onValueChange={(value) => {
                      if (value) {
                        field.handleChange(
                          value as MenuCategory
                        )
                      }
                    }}
                  >
                    <SelectTrigger className="w-full border border-black/10">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>

                    <SelectContent className="shadow-md">
                      <SelectItem value="food">
                        Food
                      </SelectItem>

                      <SelectItem value="snack">
                        Snack
                      </SelectItem>

                      <SelectItem value="drink">
                        Drink
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <form.Field
              name="price"
              children={(field) => (
                <Field>
                  <Label>Price</Label>

                  <Input
                    id="price"
                    name="price"
                    type="text"
                    inputMode="numeric"
                    className="border border-black/10"
                    placeholder="Rp 50.000"
                    value={
                      field.state.value
                        ? `Rp ${field.state.value.toLocaleString("id-ID")}`
                        : ""
                    }
                    onChange={(e) => {
                      const rawValue =
                        e.target.value.replace(/\D/g, "")

                      field.handleChange(
                        rawValue
                          ? Number(rawValue)
                          : 0
                      )
                    }}
                  />
                </Field>
              )}
            />

            <form.Field
              name="image"
              children={(field) => (
                <Field>
                  <Label>Image URL</Label>

                  <Input
                    id="image"
                    name="image"
                    type="text"
                    className="border border-black/10"
                    placeholder="https://stockimg.com/..."
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />
                </Field>
              )}
            />

            <form.Field
              name="avaliable"
              children={(field) => (
                <Field>
                  <div className="flex items-center justify-between rounded-lg border border-black/10 p-3">
                    <div className="space-y-0.5">
                      <Label>Available</Label>

                      <p className="text-xs text-muted-foreground">
                        Show this menu to customers
                      </p>
                    </div>

                    <Switch
                      checked={field.state.value}
                      onCheckedChange={(checked) => {
                        field.handleChange(checked)
                      }}
                    />
                  </div>
                </Field>
              )}
            />

            <form.Subscribe
              selector={(state) => [
                state.canSubmit,
                state.isSubmitting,
              ]}
              children={([
                canSubmit,
                isSubmitting,
              ]) => (
                <Field
                  orientation="horizontal"
                  className="grid w-full grid-cols-2"
                >
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                  >
                    {isSubmitting
                      ? "Saving..."
                      : "Save Changes"}
                  </Button>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditMenuDialog