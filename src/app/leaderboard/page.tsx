import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { createCaller, createTRPCContext } from "@/lib/trpc";

export default async function LeaderboardPage() {
  const ctx = await createTRPCContext();
  const caller = await createCaller(ctx);

  const leaderboardData = await caller.leaderboard.getTop({
    type: "worst",
    limit: 10,
  });

  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            <span className="text-green-600 mr-2">{">"}</span>Leaderboard
          </h1>
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="hover:text-black cursor-pointer"
            >
              ← Voltar
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {leaderboardData.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium">
                  #{item.rank} - Score: {item.score}
                </span>
                <span className="text-gray-400 text-sm">
                  {item.roast.language}
                </span>
              </div>
              <CodeBlock
                code={item.roast.code}
                language={item.roast.language}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
