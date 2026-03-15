import {
  bigint,
  integer,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";

export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  totalRoasts: bigint("total_roasts", { mode: "number" }).default(0).notNull(),
  totalUsers: bigint("total_users", { mode: "number" }).default(0).notNull(),
  totalTokensUsed: bigint("total_tokens_used", { mode: "number" })
    .default(0)
    .notNull(),
  averageScore: integer("average_score"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Analytics = typeof analytics.$inferSelect;
export type NewAnalytics = typeof analytics.$inferInsert;
