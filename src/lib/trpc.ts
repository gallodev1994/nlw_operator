import { appRouter } from "@/server/routers/_app";
import { createCallerFactory } from "@/server/trpc";

export const createCaller = createCallerFactory(appRouter);

export type { AppRouter } from "@/server/routers/_app";
