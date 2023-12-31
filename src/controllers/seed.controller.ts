import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { models, types } from "../db/schema";
import { Car_Types } from "../data/types.data";
import { Car_Makes } from "../data/makes.data";

class SeedController {
	async seed(c: any) {
		try {
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db.select().from(models);
			if (result.length > 0) {
				return "Models exists! Cannot override types";
			}
			await db.delete(types);
			await db.delete(makes);
			console.log("Seeding Initiate");
			const res = await db.insert(types).values(Car_Types).returning();
			const res2 = await db.insert(makes).values(Car_Makes).returning();
			console.log("Seeding Done");
			return { types: res, makes: res2 };
		} catch (error) {
			return error;
		}
	}
}

export const seedController = new SeedController();
