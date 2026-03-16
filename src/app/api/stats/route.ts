import { NextResponse } from "next/server";
import { createCaller, createTRPCContext } from "@/lib/trpc";

export async function GET() {
  const ctx = await createTRPCContext();
  const caller = await createCaller(ctx);
  const stats = await caller.leaderboard.getStats();

  return NextResponse.json(stats);
}
