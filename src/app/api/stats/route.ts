import { NextResponse } from "next/server";
import { createCaller } from "@/lib/trpc";
import { createTRPCContext } from "@/server/trpc";

export async function GET() {
  const ctx = await createTRPCContext();
  const caller = createCaller(ctx);
  const stats = await caller.leaderboard.getStats();

  return NextResponse.json(stats);
}
