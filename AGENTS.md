# Project Patterns and Conventions

This file documents the patterns and conventions used in this project.

## Quick Reference

- **Package Manager**: pnpm
- **Framework**: Next.js 15 (App Router)
- **Database**: Drizzle ORM
- **API**: tRPC v11
- **Styling**: Tailwind CSS v4 + tailwind-variants
- **UI Components**: Located in `src/components/ui/`

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm lint         # Lint with ESLint
pnpm check        # Check with Biome
pnpm check:fix    # Fix Biome issues
pnpm format       # Format code
pnpm generate     # Generate Drizzle types
pnpm migrate      # Run Drizzle migrations
pnpm studio       # Open Drizzle Studio
pnpm db:seed      # Seed database
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── leaderboard/        # Leaderboard page
│   ├── roast/[id]/         # Roast result page
│   └── components/         # Components showcase
├── components/ui/          # Reusable UI components
├── server/
│   ├── trpc.ts             # tRPC setup
│   └── routers/            # tRPC routers
├── db/                     # Database (Drizzle)
├── lib/                    # Utilities
└── specs/                  # Specifications
```

## Patterns

### Server vs Client Components

- Use `"use client"` only when needed (interactivity, hooks, browser APIs)
- Pass data from Server Components to Client Components via props
- Use async/await for params in Server Components: `const { id } = await params`

### tRPC Routers

- Define input with Zod schemas
- Access input and context: `async ({ input, ctx }) => {...}`
- Export router from `src/server/routers/`

### UI Components

- Use `tailwind-variants` for variants
- Follow patterns in `src/components/ui/AGENTS.md`
- Add `"use client"` for interactive components
- Test with Component showcase page

## Pages

See subdirectories for page-specific documentation:
- `src/app/leaderboard/AGENTS.md`
- `src/app/roast/AGENTS.md`

## Components

See `src/components/ui/AGENTS.md` for UI component patterns.
