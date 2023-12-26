import { pgTable, varchar, date, uuid } from "drizzle-orm/pg-core";

export const vehicles = pgTable("vehicles", {
	id: uuid("id").defaultRandom().primaryKey(),
	vin: varchar("vin", { length: 256 }).notNull(),
	name: varchar("name", { length: 256 }).notNull(),
	slug: varchar("slug", { length: 256 }),
	trimId: uuid("trim_id").references(() => trims.id),
});

export const trims = pgTable("trims", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 256 }).notNull(),
	slug: varchar("slug", { length: 256 }),
	year: date<"year">("year"),
	modelId: uuid("model_id").references(() => models.id),
});

export const models = pgTable("models", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 256 }).notNull(),
	slug: varchar("slug", { length: 256 }),
	makeId: uuid("make_id").references(() => makes.id),
	typeId: uuid("type_id").references(() => types.id),
});

export const types = pgTable("types", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 256 }).notNull(),
	slug: varchar("slug", { length: 256 }),
});

export const makes = pgTable("makes", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 256 }).notNull(),
	slug: varchar("slug", { length: 256 }),
});
