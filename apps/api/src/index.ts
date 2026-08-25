import { Hono } from "hono";
import menuRoute from "./routes/menu.route";

const app = new Hono();

app.route("/api/menu", menuRoute)

app.get("/", (c) => {
  return c.json({
    message: "API running",
  });
});

export default {
  port: 3001,
  fetch: app.fetch,
};