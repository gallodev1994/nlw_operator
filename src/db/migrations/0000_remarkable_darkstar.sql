CREATE TABLE "ai_configs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"provider" text NOT NULL,
	"model" text NOT NULL,
	"api_key" text,
	"base_url" text,
	"max_tokens" integer DEFAULT 4096,
	"temperature" integer DEFAULT 1,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp NOT NULL,
	"total_roasts" bigint DEFAULT 0 NOT NULL,
	"total_users" bigint DEFAULT 0 NOT NULL,
	"total_tokens_used" bigint DEFAULT 0 NOT NULL,
	"average_score" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leaderboard" (
	"id" serial PRIMARY KEY NOT NULL,
	"roast_id" integer NOT NULL,
	"rank_type" text NOT NULL,
	"rank" integer NOT NULL,
	"period" text DEFAULT 'all_time' NOT NULL,
	"score" integer NOT NULL,
	"ranked_at" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roast_scores" (
	"id" serial PRIMARY KEY NOT NULL,
	"roast_id" integer NOT NULL,
	"overall_score" integer NOT NULL,
	"code_quality" integer NOT NULL,
	"code_quality_severity" text NOT NULL,
	"security" integer NOT NULL,
	"security_severity" text NOT NULL,
	"performance" integer NOT NULL,
	"performance_severity" text NOT NULL,
	"readability" integer NOT NULL,
	"readability_severity" text NOT NULL,
	"best_practices" integer NOT NULL,
	"best_practices_severity" text NOT NULL,
	"issues" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roasts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"code" text NOT NULL,
	"language" text NOT NULL,
	"line_count" integer NOT NULL,
	"roast_mode" boolean DEFAULT true NOT NULL,
	"score" integer NOT NULL,
	"verdict" text NOT NULL,
	"roast_quote" text NOT NULL,
	"suggested_fix" text,
	"model_used" text,
	"tokens_used" integer,
	"processing_time" integer,
	"is_public" boolean DEFAULT true NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"expires_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"is_valid" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"anonymous_id" text NOT NULL,
	"display_name" text,
	"avatar_url" text,
	"is_anonymous" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_anonymous_id_unique" UNIQUE("anonymous_id")
);
--> statement-breakpoint
ALTER TABLE "leaderboard" ADD CONSTRAINT "leaderboard_roast_id_roasts_id_fk" FOREIGN KEY ("roast_id") REFERENCES "public"."roasts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roast_scores" ADD CONSTRAINT "roast_scores_roast_id_roasts_id_fk" FOREIGN KEY ("roast_id") REFERENCES "public"."roasts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roasts" ADD CONSTRAINT "roasts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;