import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { roasts } from "./roasts";

export const severityEnum = ["critical", "warning", "good"] as const;
export type Severity = (typeof severityEnum)[number];

export const roastScores = pgTable("roast_scores", {
  id: serial("id").primaryKey(),
  roastId: integer("roast_id")
    .notNull()
    .references(() => roasts.id, { onDelete: "cascade" }),
  overallScore: integer("overall_score").notNull(),
  codeQuality: integer("code_quality").notNull(),
  codeQualitySeverity: text("code_quality_severity", {
    enum: severityEnum,
  }).notNull(),
  security: integer("security").notNull(),
  securitySeverity: text("security_severity", { enum: severityEnum }).notNull(),
  performance: integer("performance").notNull(),
  performanceSeverity: text("performance_severity", {
    enum: severityEnum,
  }).notNull(),
  readability: integer("readability").notNull(),
  readabilitySeverity: text("readability_severity", {
    enum: severityEnum,
  }).notNull(),
  bestPractices: integer("best_practices").notNull(),
  bestPracticesSeverity: text("best_practices_severity", {
    enum: severityEnum,
  }).notNull(),
  issues: jsonb("issues")
    .$type<
      {
        severity: Severity;
        category: string;
        line?: number;
        message: string;
        suggestion?: string;
      }[]
    >()
    .default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type RoastScore = typeof roastScores.$inferSelect;
export type NewRoastScore = typeof roastScores.$inferInsert;
