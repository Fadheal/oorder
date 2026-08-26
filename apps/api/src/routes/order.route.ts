import { Hono } from "hono"
import { OrderController } from "../controller/order.controller"

const orderRoute = new Hono()

orderRoute.get("/", OrderController.getAll)

orderRoute.post("/", OrderController.create)

orderRoute.get("/:id", OrderController.getById)

// update status order
orderRoute.patch(
  "/:id/status",
  OrderController.updateStatus
)

export default orderRoute