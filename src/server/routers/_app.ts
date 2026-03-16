import { router } from "../trpc";
import { authRouter } from "./auth";
import { leaderboardRouter } from "./leaderboard";
import { roastRouter } from "./roast";
import { usersRouter } from "./users";

export const appRouter = router({
  roast: roastRouter,
  leaderboard: leaderboardRouter,
  auth: authRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
