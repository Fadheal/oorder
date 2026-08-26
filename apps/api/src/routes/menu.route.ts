import { Hono } from "hono";
import { createMenu, deleteMenu, getAvailableMenus, getMenu, getMenus, updateMenu } from "../controller/menu.controller";

const menuRoute = new Hono()

menuRoute.get("/",getMenus)
menuRoute.get("/available",getAvailableMenus)
menuRoute.get("/:id",getMenu)
menuRoute.post("/", createMenu)
menuRoute.put("/:id", updateMenu)
menuRoute.delete("/:id", deleteMenu)

export default menuRoute