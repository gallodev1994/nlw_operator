import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { roasts } from "./roasts";

export const leaderboardTypes = [
  "worst",
  "best",
  "most_roasted",
  "recent",
] as const;
export type LeaderboardType = (typeof leaderboardTypes)[number];

export const leaderboard = pgTable("leaderboard", {
  id: serial("id").primaryKey(),
  roastId: integer("roast_id")
    .notNull()
    .references(() => roasts.id, { onDelete: "cascade" }),
  rankType: text("rank_type", { enum: leaderboardTypes }).notNull(),
  rank: integer("rank").notNull(),
  period: text("period").notNull().default("all_time"),
  score: integer("score").notNull(),
  rankedAt: timestamp("ranked_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export type Leaderboard = typeof leaderboard.$inferSelect;
export type NewLeaderboard = typeof leaderboard.$inferInsert;
