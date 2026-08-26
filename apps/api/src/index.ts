import { Hono } from "hono";
import menuRoute from "./routes/menu.route";
import { cors } from "hono/cors";
import orderRoute from "./routes/order.route";
import checkoutRoute from "./routes/checkout.route";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
)

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