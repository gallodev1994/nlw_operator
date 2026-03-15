"use client";

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { tv, type VariantProps } from "tailwind-variants";

const scoreRingVariants = tv({
  base: "relative inline-flex items-center justify-center",
  variants: {
    size: {
      sm: "h-16 w-16",
      md: "h-24 w-24",
      lg: "h-32 w-32",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type ScoreRingVariants = VariantProps<typeof scoreRingVariants>;

interface ScoreRingProps extends ScoreRingVariants {
  score: number;
  maxScore?: number;
  label?: string;
  className?: string;
}

export const ScoreRing = ({
  score,
  maxScore = 100,
  size,
  label,
  className,
}: ScoreRingProps) => {
  const [mounted, setMounted] = useState(false);
  const percentage = Math.min(Math.max((score / maxScore) * 100, 0), 100);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = [
    { name: "progress", value: percentage },
    { name: "remaining", value: 100 - percentage },
  ];

  return (
    <div className={scoreRingVariants({ size, className })}>
      {mounted ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              <Cell fill={getScoreColor(percentage)} />
              <Cell fill="rgb(229 231 235)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="w-full h-full" />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{score}</span>
        {label && <span className="text-xs text-gray-500">{label}</span>}
      </div>
    </div>
  );
};

function getScoreColor(percentage: number): string {
  if (percentage >= 80) return "rgb(34 197 94)";
  if (percentage >= 60) return "rgb(59 130 246)";
  if (percentage >= 40) return "rgb(234 179 8)";
  return "rgb(239 68 68)";
}
