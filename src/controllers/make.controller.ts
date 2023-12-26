import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { makes } from "../db/schema";
import { eq } from "drizzle-orm";

class MakeController {
	async getMakes(c: any) {
		try {
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db.select().from(makes);
			return result;
		} catch (error) {
			return error;
		}
	}

	async getMake(c: any) {
		try {
			const id = c.req.param("id");
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const [result] = await db.select().from(makes).where(eq(makes.id, id));
			return result;
		} catch (error) {
			return error;
		}
	}

	async addMake(c: any) {
		try {
			const form = await c.req.json();
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db.insert(makes).values(form).returning();
			return result;
		} catch (error) {
			return error;
		}
	}

	async updateMake(c: any) {
		try {
			const id = c.req.param("id");
			const form = await c.req.json();
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db
				.update(makes)
				.set(form)
				.where(eq(makes.id, id))
				.returning();
			return result;
		} catch (error) {
			return error;
		}
	}

	async deleteMake(c: any) {
		try {
			const id = c.req.param("id");
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db.delete(makes).where(eq(makes.id, id)).returning();
			return result;
		} catch (error) {
			return error;
		}
	}
}

export const makeController = new MakeController();
