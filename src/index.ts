import { Hono } from "hono";
import { logger } from "hono/logger";
import { routes } from "./routes";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { cache } from "hono/cache";

export type Env = {
	DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>({ strict: false }).basePath("/api");

app.get(
	"*",
	cache({
		cacheName: "inventory-app",
		cacheControl: "max-age=7200",
	})
);
app.use("*", prettyJSON());
app.use("/api/*", cors());
app.use("*", logger());
app.route("/", routes);

export default app;
