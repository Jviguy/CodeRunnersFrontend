"use client";

import { LoggedInHeader } from "@/components/challenge/logged-in-header";
import { MyEgoCheck } from "@/components/results/my-ego-check";
import { CrucibleLeaderboards } from "@/components/results/crucible-leaderboards";
import { useAuth } from "@/hooks/use-auth";

export default function ResultsPage() {
  const { user, isLoading } = useAuth({ pageType: "protected" });

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-mono">Loading results...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <LoggedInHeader
        username={user.username || "User"}
        experience={user.experience || "Intermediate"}
        language={user.language || "JavaScript"}
      />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <MyEgoCheck username={user.username || "User"} />
        <CrucibleLeaderboards />
      </main>
    </div>
  );
}
