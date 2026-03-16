import { createCallerFactory, createTRPCContext } from "@/server/trpc";

export const createCaller = async (
  ctx: Awaited<ReturnType<typeof createTRPCContext>>,
) => {
  const { appRouter } = await import("@/server/routers/_app");
  const callerFn = createCallerFactory(appRouter);
  return callerFn(ctx);
};

export { createTRPCContext };
export type { AppRouter } from "@/server/routers/_app";
