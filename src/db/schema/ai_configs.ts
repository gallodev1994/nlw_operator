import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const providerTypes = [
  "openai",
  "anthropic",
  "google",
  "openrouter",
  "ai-gateway",
] as const;
export type ProviderType = (typeof providerTypes)[number];

export const aiConfigs = pgTable("ai_configs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  provider: text("provider", { enum: providerTypes }).notNull(),
  model: text("model").notNull(),
  apiKey: text("api_key"),
  baseUrl: text("base_url"),
  maxTokens: integer("max_tokens").default(4096),
  temperature: integer("temperature").default(1),
  isActive: boolean("is_active").default(true).notNull(),
  isDefault: boolean("is_default").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type AiConfig = typeof aiConfigs.$inferSelect;
export type NewAiConfig = typeof aiConfigs.$inferInsert;
