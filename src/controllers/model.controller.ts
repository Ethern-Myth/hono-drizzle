import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { types, makes, models } from "../db/schema";
import { eq } from "drizzle-orm";

class ModelController {
	async getModels(c: any) {
		try {
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db
				.select()
				.from(models)
				.innerJoin(types, eq(types.id, models.typeId))
				.innerJoin(makes, eq(makes.id, models.makeId));
			return result;
		} catch (error) {
			return error;
		}
	}

	async getModel(c: any) {
		try {
			const id = c.req.param("id");
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const [result] = await db
				.select()
				.from(models)
				.where(eq(models.id, id))
				.innerJoin(types, eq(types.id, models.typeId))
				.innerJoin(makes, eq(makes.id, models.makeId));
			return result;
		} catch (error) {
			return error;
		}
	}

	async addModel(c: any) {
		try {
			const form = await c.req.json();
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db.insert(models).values(form).returning();
			return result;
		} catch (error) {
			return error;
		}
	}

	async updateModel(c: any) {
		try {
			const id = c.req.param("id");
			const form = await c.req.json();
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db
				.update(models)
				.set(form)
				.where(eq(models.id, id))
				.returning();
			return result;
		} catch (error) {
			return error;
		}
	}

	async deleteModel(c: any) {
		try {
			const id = c.req.param("id");
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db
				.delete(models)
				.where(eq(models.id, id))
				.returning();
			return result;
		} catch (error) {
			return error;
		}
	}
}

export const modelController = new ModelController();
