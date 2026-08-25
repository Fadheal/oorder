import { Hono } from "hono";
import { createMenu, deleteMenu, getMenu, getMenus, updateMenu } from "../controller/menu.controller";

const menuRoute = new Hono()

menuRoute.get("/",getMenus)
menuRoute.get("/:id",getMenu)
menuRoute.post("/", createMenu)
menuRoute.put("/:id", updateMenu)
menuRoute.delete("/:id", deleteMenu)

export default menuRoute