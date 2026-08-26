import { Hono } from "hono"
import { OrderController } from "../controller/order.controller"

const orderRoute = new Hono()

orderRoute.get("/", OrderController.getAll)
orderRoute.post("/", OrderController.create)

export default orderRoute