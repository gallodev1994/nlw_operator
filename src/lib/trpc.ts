import type { appRouter } from "@/server/routers/_app";
import {
  type Context,
  createCallerFactory,
  createTRPCContext,
} from "@/server/trpc";

type AppRouterType = typeof appRouter;

export async function createCaller() {
  const ctx = await createTRPCContext();
  const caller = createCallerFactory<AppRouterType>();
  return caller(ctx);
}

export type { AppRouter } from "@/server/routers/_app";
