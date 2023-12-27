CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"make_id" uuid,
	"password" varchar(256),
	"createdAt" timestamp,
	"updatedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "makes" ADD COLUMN "createdAt" timestamp;--> statement-breakpoint
ALTER TABLE "makes" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "models" ADD COLUMN "createdAt" timestamp;--> statement-breakpoint
ALTER TABLE "models" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "trims" ADD COLUMN "createdAt" timestamp;--> statement-breakpoint
ALTER TABLE "trims" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "types" ADD COLUMN "createdAt" timestamp;--> statement-breakpoint
ALTER TABLE "types" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "createdAt" timestamp;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_make_id_makes_id_fk" FOREIGN KEY ("make_id") REFERENCES "makes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
