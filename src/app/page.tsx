import Link from "next/link";
import { Suspense } from "react";
import {
  ShameLeaderboard,
  ShameLeaderboardStats,
} from "@/components/shame-leaderboard";
import {
  ShameLeaderboardSkeleton,
  ShameLeaderboardStatsSkeleton,
} from "@/components/shame-leaderboard-skeleton";
import { StatsWithAnimation } from "@/components/stats-client";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/ui/code-editor";
import { Switch } from "@/components/ui/switch";

export default function Home() {
  return (
    <>
      <header className="flex justify-between p-5 border-b border-gray-600">
        <h1 className="text-4xl">
          <span className="text-green-600 mr-2">{">"}</span>devroast
        </h1>
        <Link href={"/leaderboard"}>
          <span className="mt-2 text-gray-500">leaderboard</span>
        </Link>
      </header>
      <section className="mt-20 flex items-center justify-center">
        <div className="mb-5">
          <h2 className="text-4xl font-bold">
            <span className="text-green-600 mr-2">{"$"}</span> paste your code.
            get roasted.
          </h2>
          <p className="text-gray-500 mt-2">
            {
              "// drop your code below and we'll rate it - brutally honest or full roast mode"
            }
          </p>
          <div className="mt-5 mb-5">
            <CodeEditor defaultValue={`// paste your code here ...`} />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-3">
              <label className="flex items-center gap-2">
                <Switch size="sm" defaultChecked />
                <span className="text-sm text-gray-500">roast mode</span>
              </label>
              <div className="mt-1">
                <span className="text-gray-500">{" // "}</span>
                <span className="text-gray-500">maximize sarcasm enabled</span>
              </div>
            </div>
            <Button size="sm" variant="primary">
              $ roast_my_code
            </Button>
          </div>
          <div className="mt-10 flex justify-center">
            <StatsWithAnimation />
          </div>
        </div>
      </section>
      <section className="mt-10 flex flex-col mx-auto w-[50%] pb-20">
        <div className="flex justify-between flex-1 mb-2">
          <div className="mt-2">
            <span className="text-green-600 mr-3 text-lg">{"//"}</span>
            <span className="text-lg text-gray-500">shame_leaderboard</span>
          </div>
          <Link href={"/leaderboard"}>
            <Button
              variant="outline"
              size="sm"
              className="hover:text-black cursor-pointer"
            >
              {"$ view_all >>"}
            </Button>
          </Link>
        </div>

        <span className="text-gray-500 text-sm mb-4">
          {"// the worst code on the internet, ranked by shame"}
        </span>

        <Suspense fallback={<ShameLeaderboardSkeleton />}>
          <ShameLeaderboard />
        </Suspense>
      </section>
    </>
  );
}
