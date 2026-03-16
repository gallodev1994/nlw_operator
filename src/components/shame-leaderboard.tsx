import { createCaller } from "@/lib/trpc";

async function getShameLeaderboard() {
  const caller = await createCaller();
  return caller.leaderboard.getWorst({ limit: 3 });
}

async function getStats() {
  const caller = await createCaller();
  return caller.leaderboard.getStats();
}

export async function ShameLeaderboard() {
  const items = await getShameLeaderboard();

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="bg-gray-800/50 rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-sm font-medium ${
                index === 0
                  ? "text-red-400"
                  : index === 1
                    ? "text-yellow-400"
                    : "text-orange-400"
              }`}
            >
              #{index + 1}
            </span>
            <span className="text-red-400 text-sm font-bold">{item.score}</span>
          </div>
          <pre className="text-gray-400 text-xs font-mono truncate">
            {item.code.split("\n")[0]}
          </pre>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-500 text-xs">{item.language}</span>
            <span className="text-gray-600 text-xs truncate max-w-[150px]">
              {item.roastQuote}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export async function ShameLeaderboardStats() {
  const stats = await getStats();

  return (
    <div className="flex justify-center gap-8 mt-4">
      <span className="text-gray-500 text-sm">
        {stats.totalRoasts.toLocaleString()} códigos roasted
      </span>
      <span className="text-gray-500 text-sm">
        avg score: {stats.avgScore}/100
      </span>
    </div>
  );
}
