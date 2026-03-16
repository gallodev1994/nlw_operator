import { appRouter } from "@/server/routers/_app";
import { createCallerFactory, createTRPCContext } from "@/server/trpc";

export async function createCaller() {
  const ctx = await createTRPCContext();
  return createCallerFactory(appRouter)(ctx);
}

export type { AppRouter } from "@/server/routers/_app";
