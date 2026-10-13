CREATE TABLE "lab_preferences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"registration_id" uuid NOT NULL,
	"lab_id" varchar(40) NOT NULL,
	"rank" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lab_interest_events" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "lab_interest_events" CASCADE;--> statement-breakpoint
DROP INDEX "lab_registrations_created_idx";--> statement-breakpoint
DROP INDEX "lab_registrations_email_idx";--> statement-breakpoint
ALTER TABLE "lab_registrations" ALTER COLUMN "email" SET DATA TYPE varchar(254);--> statement-breakpoint
ALTER TABLE "lab_registrations" ALTER COLUMN "company" SET DATA TYPE varchar(160);--> statement-breakpoint
ALTER TABLE "lab_registrations" ALTER COLUMN "motivation" SET DATA TYPE varchar(40);--> statement-breakpoint
ALTER TABLE "lab_registrations" ALTER COLUMN "notes" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "lab_registrations" ALTER COLUMN "notes" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "lab_registrations" ALTER COLUMN "status" SET DATA TYPE varchar(30);--> statement-breakpoint
ALTER TABLE "lab_registrations" ALTER COLUMN "status" SET DEFAULT 'registered';--> statement-breakpoint
ALTER TABLE "lab_registrations" ADD COLUMN "name" varchar(120) NOT NULL;--> statement-breakpoint
ALTER TABLE "lab_registrations" ADD COLUMN "role" varchar(120) NOT NULL;--> statement-breakpoint
ALTER TABLE "lab_registrations" ADD COLUMN "consent" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "lab_registrations" ADD COLUMN "confirmation_status" varchar(30) DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "lab_registrations" ADD COLUMN "confirmation_sent_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "lab_preferences" ADD CONSTRAINT "lab_preferences_registration_id_lab_registrations_id_fk" FOREIGN KEY ("registration_id") REFERENCES "public"."lab_registrations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "lab_preference_registration_rank_unique" ON "lab_preferences" USING btree ("registration_id","rank");--> statement-breakpoint
CREATE UNIQUE INDEX "lab_preference_registration_lab_unique" ON "lab_preferences" USING btree ("registration_id","lab_id");--> statement-breakpoint
CREATE UNIQUE INDEX "lab_registration_email_unique" ON "lab_registrations" USING btree ("email");--> statement-breakpoint
CREATE INDEX "lab_registration_created_idx" ON "lab_registrations" USING btree ("created_at");--> statement-breakpoint
ALTER TABLE "lab_registrations" DROP COLUMN "full_name";--> statement-breakpoint
ALTER TABLE "lab_registrations" DROP COLUMN "job_title";--> statement-breakpoint
ALTER TABLE "lab_registrations" DROP COLUMN "professional_role";--> statement-breakpoint
ALTER TABLE "lab_registrations" DROP COLUMN "preferences";--> statement-breakpoint
ALTER TABLE "lab_registrations" DROP COLUMN "first_choice";--> statement-breakpoint
ALTER TABLE "lab_registrations" DROP COLUMN "consent_to_follow_up";--> statement-breakpoint
ALTER TABLE "lab_registrations" DROP COLUMN "email_status";