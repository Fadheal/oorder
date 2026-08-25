import type { Context } from "hono";
import { MenuService } from "../services/menu.services";

export async function getMenus(c: Context) {
  const menu = await MenuService.getAll()

  return c.json(menu)
}

export async function getMenu(c: Context) {
  const id = String(c.req.param("id"))

  const menu = await MenuService.getById(id)

  if (!menu) {
    return c.json(
      {
        message: "menu_not_found",
      },
      404
    )
  }

  return c.json(menu)
}

export async function createMenu(c: Context) {
  const body = await c.req.json()

  const menu = await MenuService.create(body)

  return c.json(menu, 201)
}

export async function updateMenu(c: Context) {
  const id = String(c.req.param("id"))
  const body = await c.req.json()

  const menu = await MenuService.update(id, body)

  if (!menu) {
    return c.json(
      {
        message: "menu_not_found",
      },
      404
    )
  }

  return c.json(menu)
}

export async function deleteMenu(c: Context) {
  const id = String(c.req.param("id"))

  const menu = MenuService.remove(id)

  if (!menu) {
    return c.json(
      {
        message: "menu_not_found",
      },
      404
    )
  }

  return c.json({
    message: "menu_deleted",
  })
}