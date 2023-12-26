import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { trims, models } from "../db/schema";
import { eq } from "drizzle-orm";

class TrimController {
	async getTrims(c: any) {
		try {
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db
				.select()
				.from(trims)
				.innerJoin(models, eq(models.id, trims.modelId));
			return result;
		} catch (error) {
			return error;
		}
	}

	async getTrim(c: any) {
		try {
			const id = c.req.param("id");
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const [result] = await db
				.select()
				.from(trims)
				.where(eq(trims.id, id))
				.innerJoin(models, eq(models.id, trims.modelId));
			return result;
		} catch (error) {
			return error;
		}
	}

	async addTrim(c: any) {
		try {
			const form = await c.req.json();
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db.insert(trims).values(form).returning();
			return result;
		} catch (error) {
			return error;
		}
	}

	async updateTrim(c: any) {
		try {
			const id = c.req.param("id");
			const form = await c.req.json();
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db
				.update(trims)
				.set(form)
				.where(eq(trims.id, id))
				.returning();
			return result;
		} catch (error) {
			return error;
		}
	}

	async deleteTrim(c: any) {
		try {
			const id = c.req.param("id");
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db.delete(trims).where(eq(trims.id, id)).returning();
			return result;
		} catch (error) {
			return error;
		}
	}
}

export const trimController = new TrimController();
