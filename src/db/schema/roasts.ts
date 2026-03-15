import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const verdictEnum = [
  "need_serious_help",
  "rough_around_edges",
  "decent_code",
  "solid_work",
  "exceptional",
] as const;
export type Verdict = (typeof verdictEnum)[number];

export const roasts = pgTable("roasts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  code: text("code").notNull(),
  language: text("language").notNull(),
  lineCount: integer("line_count").notNull(),
  roastMode: boolean("roast_mode").default(true).notNull(),
  score: integer("score").notNull(),
  verdict: text("verdict", { enum: verdictEnum }).notNull(),
  roastQuote: text("roast_quote").notNull(),
  suggestedFix: text("suggested_fix"),
  modelUsed: text("model_used"),
  tokensUsed: integer("tokens_used"),
  processingTime: integer("processing_time"),
  isPublic: boolean("is_public").default(true).notNull(),
  viewCount: integer("view_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Roast = typeof roasts.$inferSelect;
export type NewRoast = typeof roasts.$inferInsert;
