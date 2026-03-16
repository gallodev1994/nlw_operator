import { Skeleton } from "./ui/skeleton";

export function ShameLeaderboardSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-gray-800/50 rounded-lg p-3 border border-gray-700"
        >
          <div className="flex items-center justify-between mb-2">
            <Skeleton variant="default" size="sm" className="w-6" />
            <Skeleton variant="default" size="sm" className="w-8" />
          </div>
          <Skeleton variant="default" className="h-4 w-full mb-2" />
          <div className="flex items-center justify-between mt-2">
            <Skeleton variant="default" size="sm" className="w-16" />
            <Skeleton variant="default" size="sm" className="w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ShameLeaderboardStatsSkeleton() {
  return (
    <div className="flex justify-center gap-8 mt-4">
      <Skeleton variant="default" size="sm" className="w-32" />
      <Skeleton variant="default" size="sm" className="w-28" />
    </div>
  );
}
