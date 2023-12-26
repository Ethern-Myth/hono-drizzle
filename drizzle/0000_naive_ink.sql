CREATE TABLE IF NOT EXISTS "makes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"slug" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "models" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"slug" varchar(256),
	"make_id" uuid,
	"type_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trims" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"slug" varchar(256),
	"year" date,
	"model_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"slug" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vin" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"slug" varchar(256),
	"trim_id" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "models" ADD CONSTRAINT "models_make_id_makes_id_fk" FOREIGN KEY ("make_id") REFERENCES "makes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "models" ADD CONSTRAINT "models_type_id_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trims" ADD CONSTRAINT "trims_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_trim_id_trims_id_fk" FOREIGN KEY ("trim_id") REFERENCES "trims"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
