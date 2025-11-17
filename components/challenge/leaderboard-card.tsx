"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Solver {
  username: string;
  time: string;
}

interface QualityUser {
  username: string;
  score: number;
}

interface LeaderboardCardProps {
  fastestSolvers: Solver[];
  highestQuality: QualityUser[];
}

export function LeaderboardCard({
  fastestSolvers,
  highestQuality,
}: LeaderboardCardProps) {
  const router = useRouter();

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-xl font-bold text-foreground mb-6 font-mono">
        Live Leaderboards
      </h3>

      <div className="mb-6">
        <h4 className="text-sm font-bold text-primary mb-3 font-mono">
          Fastest Solvers
        </h4>
        <div className="space-y-2">
          {fastestSolvers.map((solver, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground font-mono w-4">
                  {index + 1}.
                </span>
                <span className="text-foreground font-mono">
                  {solver.username}
                </span>
              </div>
              <span className="text-primary font-mono font-bold">
                {solver.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-bold text-primary mb-3 font-mono">
          Highest Quality (Gemini Score)
        </h4>
        <div className="space-y-2">
          {highestQuality.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground font-mono w-4">
                  {index + 1}.
                </span>
                <span className="text-foreground font-mono">
                  {user.username}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-primary font-mono font-bold">
                  {user.score.toFixed(1)}
                </span>
                <Star className="w-4 h-4 text-primary fill-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full font-sans"
        onClick={() => router.push("/results")}
      >
        View Full Leaderboards & Your Review
      </Button>
    </div>
  );
}
