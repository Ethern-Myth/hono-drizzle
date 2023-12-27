import { pgTable, varchar, date, uuid, timestamp } from "drizzle-orm/pg-core";

export const vehicles = pgTable("vehicles", {
	id: uuid("id").defaultRandom().primaryKey(),
	vin: varchar("vin", { length: 256 }).notNull(),
	name: varchar("name", { length: 256 }).notNull(),
	slug: varchar("slug", { length: 256 }),
	trimId: uuid("trim_id").references(() => trims.id),
	createdAt: timestamp("createdAt"),
	updatedAt: timestamp("updatedAt"),
});

export const trims = pgTable("trims", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 256 }).notNull(),
	slug: varchar("slug", { length: 256 }),
	year: date<"year">("year"),
	modelId: uuid("model_id").references(() => models.id),
	createdAt: timestamp("createdAt"),
	updatedAt: timestamp("updatedAt"),
});

export const models = pgTable("models", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 256 }).notNull(),
	slug: varchar("slug", { length: 256 }),
	makeId: uuid("make_id").references(() => makes.id),
	typeId: uuid("type_id").references(() => types.id),
	createdAt: timestamp("createdAt"),
	updatedAt: timestamp("updatedAt"),
});

export const types = pgTable("types", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 256 }).notNull(),
	slug: varchar("slug", { length: 256 }),
	createdAt: timestamp("createdAt"),
	updatedAt: timestamp("updatedAt"),
});

export const makes = pgTable("makes", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 256 }).notNull(),
	slug: varchar("slug", { length: 256 }),
	createdAt: timestamp("createdAt"),
	updatedAt: timestamp("updatedAt"),
});

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	makeId: uuid("make_id").references(() => makes.id),
	password: varchar("password", { length: 256 }),
	createdAt: timestamp("createdAt"),
	updatedAt: timestamp("updatedAt"),
});
