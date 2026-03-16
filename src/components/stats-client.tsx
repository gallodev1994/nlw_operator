"use client";

import NumberFlow from "@number-flow/react";
import { useQuery } from "@tanstack/react-query";

interface Stats {
  totalRoasts: number;
  avgScore: number;
}

async function fetchStats(): Promise<Stats> {
  const res = await fetch("/api/stats");
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export function StatsWithAnimation() {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    initialData: { totalRoasts: 0, avgScore: 0 },
  });

  return (
    <div className="flex gap-15 items-center">
      <NumberFlow
        value={data.totalRoasts}
        className="text-gray-500"
        format={{ maximumFractionDigits: 0 }}
      />
      <span className="text-gray-500">codes roasted</span>
      <span className="text-gray-500">.</span>
      <NumberFlow
        value={data.avgScore}
        className="text-gray-500"
        format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
      />
      <span className="text-gray-500">/10</span>
    </div>
  );
}
