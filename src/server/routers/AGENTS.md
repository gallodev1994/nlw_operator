# tRPC Routers

## Overview
This project uses tRPC v11 for type-safe API endpoints.

## Setup

### Main Router
- File: `src/server/routers/_app.ts`
- Combines all routers: roast, leaderboard, auth, users

### Context
- File: `src/server/trpc.ts`
- Exports: `publicProcedure`, `router`, `createCallerFactory`
- Context includes database connection from Drizzle

## Routers

### roastRouter
- `list` - List roasts with pagination
- `getById` - Get roast by ID
- `create` - Create new roast
- `getByUser` - Get roasts by user
- `incrementViewCount` - Increment view count

### leaderboardRouter
- `getLeaderboard` - Get leaderboard with filters
- `getTop` - Get top entries
- `getStats` - Get statistics (total, avg, best, worst score)

### authRouter
- `createSession` - Create anonymous session
- `getOrCreateAnonymous` - Get or create anonymous user

### usersRouter
- `getByAnonymousId` - Get user by anonymous ID
- `getById` - Get user by ID
- `create` - Create user

## Pattern
```typescript
export const router = router({
  endpoint: publicProcedure
    .input(z.object({ /* schema */ }))
    .query(async ({ input, ctx }) => {
      // handler
    }),
});
```

## Input Validation
All inputs must be defined using Zod schemas before the handler.

## Related Files
- `src/server/trpc.ts` - tRPC setup
- `src/server/routers/_app.ts` - Main router
- `src/server/routers/roast.ts` - Roast router
- `src/server/routers/leaderboard.ts` - Leaderboard router
- `src/server/routers/auth.ts` - Auth router
- `src/server/routers/users.ts` - Users router
