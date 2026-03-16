import { eq } from "drizzle-orm";
import { z } from "zod";
import { users } from "@/db/schema/users";
import { publicProcedure, router } from "../trpc";

export const usersRouter = router({
  getProfile: publicProcedure
    .input(z.object({ anonymousId: z.string() }))
    .query(async ({ input, ctx }) => {
      const [user] = await ctx.db
        .select()
        .from(users)
        .where(eq(users.anonymousId, input.anonymousId));

      return user ?? null;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const [user] = await ctx.db
        .select()
        .from(users)
        .where(eq(users.id, input.id));

      return user ?? null;
    }),

  updateProfile: publicProcedure
    .input(
      z.object({
        anonymousId: z.string(),
        displayName: z.string().optional(),
        avatarUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const [updated] = await ctx.db
        .update(users)
        .set({
          displayName: input.displayName ?? undefined,
          avatarUrl: input.avatarUrl ?? undefined,
          updatedAt: new Date(),
        })
        .where(eq(users.anonymousId, input.anonymousId))
        .returning();

      return updated ?? null;
    }),
});
