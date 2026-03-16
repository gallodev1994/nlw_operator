import { and, asc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { leaderboard, leaderboardTypes } from "@/db/schema/leaderboard";
import { roasts } from "@/db/schema/roasts";
import { publicProcedure, router } from "../trpc";

export const leaderboardRouter = router({
  getLeaderboard: publicProcedure
    .input(
      z.object({
        type: z.enum(leaderboardTypes),
        period: z.enum(["daily", "weekly", "all_time"]).default("all_time"),
        limit: z.number().min(1).max(100).default(10),
      }),
    )
    .query(async ({ input, ctx }) => {
      const items = await ctx.db
        .select({
          id: leaderboard.id,
          rank: leaderboard.rank,
          score: leaderboard.score,
          rankType: leaderboard.rankType,
          roast: {
            id: roasts.id,
            code: roasts.code,
            language: roasts.language,
            verdict: roasts.verdict,
            roastQuote: roasts.roastQuote,
            viewCount: roasts.viewCount,
            createdAt: roasts.createdAt,
          },
        })
        .from(leaderboard)
        .innerJoin(roasts, eq(leaderboard.roastId, roasts.id))
        .where(
          and(
            eq(leaderboard.rankType, input.type),
            eq(leaderboard.period, input.period),
            eq(leaderboard.isActive, true),
          ),
        )
        .orderBy(asc(leaderboard.rank))
        .limit(input.limit);

      return items;
    }),

  getTop: publicProcedure
    .input(
      z.object({
        type: z.enum(leaderboardTypes),
        limit: z.number().min(1).max(100).default(10),
      }),
    )
    .query(async ({ input, ctx }) => {
      const items = await ctx.db
        .select({
          id: leaderboard.id,
          rank: leaderboard.rank,
          score: leaderboard.score,
          rankType: leaderboard.rankType,
          roast: {
            id: roasts.id,
            code: roasts.code,
            language: roasts.language,
            verdict: roasts.verdict,
            roastQuote: roasts.roastQuote,
            viewCount: roasts.viewCount,
            createdAt: roasts.createdAt,
          },
        })
        .from(leaderboard)
        .innerJoin(roasts, eq(leaderboard.roastId, roasts.id))
        .where(
          and(
            eq(leaderboard.rankType, input.type),
            eq(leaderboard.isActive, true),
          ),
        )
        .orderBy(asc(leaderboard.rank))
        .limit(input.limit);

      return items;
    }),

  getStats: publicProcedure.query(async ({ ctx }) => {
    const totalRoasts = await ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(roasts);

    const avgScore = await ctx.db
      .select({ avg: sql<number>`avg(${roasts.score})` })
      .from(roasts);

    const worstScore = await ctx.db
      .select({ min: sql<number>`min(${roasts.score})` })
      .from(roasts);

    const bestScore = await ctx.db
      .select({ max: sql<number>`max(${roasts.score})` })
      .from(roasts);

    return {
      totalRoasts: totalRoasts[0]?.count ?? 0,
      avgScore: Math.round(avgScore[0]?.avg ?? 0),
      worstScore: worstScore[0]?.min ?? 0,
      bestScore: bestScore[0]?.max ?? 0,
    };
  }),

  getWorst: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(10).default(3),
      }),
    )
    .query(async ({ input, ctx }) => {
      const items = await ctx.db
        .select({
          id: roasts.id,
          score: roasts.score,
          code: roasts.code,
          language: roasts.language,
          verdict: roasts.verdict,
          roastQuote: roasts.roastQuote,
          createdAt: roasts.createdAt,
        })
        .from(roasts)
        .where(eq(roasts.isPublic, true))
        .orderBy(asc(roasts.score))
        .limit(input.limit);

      return items;
    }),
});
