import { Hono } from "hono";
import menuRoute from "./routes/menu.route";
import { cors } from "hono/cors";
import orderRoute from "./routes/order.route";
import checkoutRoute from "./routes/checkout.route";
import { auth } from "./lib/auth";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowHeaders: [
      "Content-Type",
      "Authorization",
    ],
    allowMethods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
  })
)

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw)
})

app.route("/api/menu", menuRoute)
app.route("/api/orders", orderRoute)
app.route("/api/checkout", checkoutRoute)

app.get("/", (c) => {
  return c.json({
    message: "API running",
  });
});

export default {
  port: 3001,
  fetch: app.fetch,
};