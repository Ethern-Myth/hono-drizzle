import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { vehicles, trims } from "../db/schema";
import { eq } from "drizzle-orm";

class VehicleController {
	async getVehicles(c: any) {
		try {
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db
				.select()
				.from(vehicles)
				.innerJoin(trims, eq(vehicles.trimId, trims.id));
			return result;
		} catch (error) {
			return error;
		}
	}

	async getVehicle(c: any) {
		try {
			const id = c.req.param("id");
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const [result] = await db
				.select()
				.from(vehicles)
				.where(eq(vehicles.id, id))
				.innerJoin(trims, eq(vehicles.trimId, trims.id));
			return result;
		} catch (error) {
			return error;
		}
	}

	async addVehicle(c: any) {
		try {
			const form = await c.req.json();
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db.insert(vehicles).values(form).returning();
			return result;
		} catch (error) {
			return error;
		}
	}

	async updateVehicle(c: any) {
		try {
			const id = c.req.param("id");
			const form = await c.req.json();
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db
				.update(vehicles)
				.set(form)
				.where(eq(vehicles.id, id))
				.returning();
			return result;
		} catch (error) {
			return error;
		}
	}

	async deleteVehicle(c: any) {
		try {
			const id = c.req.param("id");
			const client = new Pool({ connectionString: c.env.DATABASE_URL });
			const db = drizzle(client);
			const result = await db
				.delete(vehicles)
				.where(eq(vehicles.id, id))
				.returning();
			return result;
		} catch (error) {
			return error;
		}
	}
}

export const vehicleController = new VehicleController();
