CREATE TABLE "resource_leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"company" text NOT NULL,
	"resource_slug" text NOT NULL,
	"resource_type" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
