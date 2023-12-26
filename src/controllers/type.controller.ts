import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { types } from "../db/schema";
import { eq } from "drizzle-orm";

class TypeController {
	async getTypes(c: any) {
		try {
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db.select().from(types);
			return result;
		} catch (error) {
			return error;
		}
	}

	async getType(c: any) {
		try {
			const id = c.req.param("id");
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const [result] = await db.select().from(types).where(eq(types.id, id));
			return result;
		} catch (error) {
			return error;
		}
	}
}

export const typeController = new TypeController();
