import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { users } from "@/db/schema/users";
import { publicProcedure, router } from "../trpc";

export const authRouter = router({
  createSession: publicProcedure
    .input(
      z
        .object({
          displayName: z.string().optional(),
        })
        .optional(),
    )
    .mutation(async ({ input, ctx }) => {
      const anonymousId = nanoid(32);

      const [created] = await ctx.db
        .insert(users)
        .values({
          anonymousId,
          displayName: input?.displayName ?? null,
          isAnonymous: true,
        })
        .returning();

      return {
        anonymousId: created.anonymousId,
        userId: created.id,
      };
    }),

  getOrCreateAnonymous: publicProcedure
    .input(z.object({ anonymousId: z.string() }))
    .query(async ({ input, ctx }) => {
      const [user] = await ctx.db
        .select()
        .from(users)
        .where(eq(users.anonymousId, input.anonymousId));

      if (user) {
        return user;
      }

      const [created] = await ctx.db
        .insert(users)
        .values({
          anonymousId: input.anonymousId,
          isAnonymous: true,
        })
        .returning();

      return created;
    }),
});
