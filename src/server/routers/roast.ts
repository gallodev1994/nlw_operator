import { and, desc, eq, gt, sql } from "drizzle-orm";
import { z } from "zod";
import { type NewRoast, type Roast, roasts } from "@/db/schema/roasts";
import { publicProcedure, router } from "../trpc";

export const roastRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
        isPublic: z.boolean().default(true),
      }),
    )
    .query(async ({ input, ctx }) => {
      const items = await ctx.db
        .select()
        .from(roasts)
        .where(eq(roasts.isPublic, input.isPublic))
        .orderBy(desc(roasts.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      const total = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(roasts)
        .where(eq(roasts.isPublic, input.isPublic));

      return {
        items,
        total: total[0]?.count ?? 0,
      };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const [item] = await ctx.db
        .select()
        .from(roasts)
        .where(eq(roasts.id, input.id));
      return item ?? null;
    }),

  create: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        code: z.string().min(1),
        language: z.string().min(1),
        lineCount: z.number().min(1),
        roastMode: z.boolean().default(true),
        score: z.number().min(0).max(100),
        verdict: z.string(),
        roastQuote: z.string(),
        suggestedFix: z.string().optional(),
        modelUsed: z.string().optional(),
        tokensUsed: z.number().optional(),
        processingTime: z.number().optional(),
        isPublic: z.boolean().default(true),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const [created] = await ctx.db
        .insert(roasts)
        .values({
          userId: input.userId,
          code: input.code,
          language: input.language,
          lineCount: input.lineCount,
          roastMode: input.roastMode,
          score: input.score,
          verdict: input.verdict,
          roastQuote: input.roastQuote,
          suggestedFix: input.suggestedFix,
          modelUsed: input.modelUsed,
          tokensUsed: input.tokensUsed,
          processingTime: input.processingTime,
          isPublic: input.isPublic,
          viewCount: 0,
        })
        .returning();
      return created;
    }),

  getByUser: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      }),
    )
    .query(async ({ input, ctx }) => {
      return ctx.db
        .select()
        .from(roasts)
        .where(eq(roasts.userId, input.userId))
        .orderBy(desc(roasts.createdAt))
        .limit(input.limit)
        .offset(input.offset);
    }),

  incrementViewCount: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(roasts)
        .set({ viewCount: sql`${roasts.viewCount} + 1` })
        .where(eq(roasts.id, input.id));
    }),
});
