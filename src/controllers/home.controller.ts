import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { users } from "../db/schema";
import { eq, sql } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class HomeController {
	async login(c: any) {
		try {
			const form = await c.req.json();
			const makeId = form.id;
			const password = form.password;
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const [result] = await db
				.select()
				.from(users)
				.where(sql`${makeId}=makeId`);
			if (result) {
				if (!bcrypt.compareSync(result.password!, password)) {
					return { message: "Login failed" };
				}
				const token = jwt.sign({ result }, "my_secret_key");
				return { token: token, result: result, message: "Login Success" };
			}
			return { message: "Login failed" };
		} catch (error) {
			return error;
		}
	}

	async register(c: any) {
		try {
			const form = await c.req.json();
			const id = form.id;
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const [result] = await db
				.select()
				.from(users)
				.where(eq(users.makeId, id));
			if (result) {
				return { message: "Manufacturer already registered" };
			}
			const data = {
				makeId: form.id,
				password: bcrypt.hashSync(form.password, 10),
			};
			const [res] = await db.insert(users).values(data).returning();
			return { res, message: "" };
		} catch (error) {
			return error;
		}
	}
}

export const homeController = new HomeController();
