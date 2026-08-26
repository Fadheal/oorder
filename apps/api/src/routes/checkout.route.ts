import { Hono } from "hono"
import { CheckoutController } from "../controller/checkout.controller"

const checkoutRoute = new Hono()

checkoutRoute.post(
  "/",
  CheckoutController.create
)

checkoutRoute.post(
  "/:id/confirm",
  CheckoutController.confirm
)

export default checkoutRoute