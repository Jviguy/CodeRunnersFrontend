"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LoggedInHeader } from "@/components/challenge/logged-in-header";
import { ChallengeDescription } from "@/components/challenge/challenge-description";
import { StatsCard } from "@/components/challenge/stats-card";
import { CLICommandsCard } from "@/components/challenge/cli-commands-card";
import { LeaderboardCard } from "@/components/challenge/leaderboard-card";
import { SubmitCodeCard } from "@/components/challenge/submit-code-card";
import {
  getCurrentChallenge,
  getUsers,
  getCompetitionState,
  getSubmissions,
  type Challenge,
  type Submission,
} from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";

export default function ChallengePage() {
  const { user, isLoading: isAuthLoading } = useAuth({ pageType: "protected" });

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [competitionState, setCompetitionState] = useState<
    "coding" | "reviewing"
  >("coding");
  const [isLoading, setIsLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [challengeData, users, state, submissionsData] =
          await Promise.all([
            getCurrentChallenge(),
            getUsers(),
            getCompetitionState(),
            getSubmissions(),
          ]);

        setChallenge(challengeData);
        setTotalParticipants(users.length);
        setCompetitionState(state.State);
        setSubmissions(submissionsData);
        setIsLoading(false);
      } catch (error) {
        console.error("[v0] Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const fastestSolvers = submissions.slice(0, 3).map((sub, index) => ({
    username: sub.Author,
    time: `${Math.floor(Math.random() * 30) + 10}m ${Math.floor(Math.random() * 60)}s`,
  }));

  const highestQuality = submissions
    .map((sub) => ({
      username: sub.Author,
      score:
        sub.Reviews && sub.Reviews.length > 0
          ? sub.Reviews.reduce((acc, r) => acc + r.Stars, 0) /
            sub.Reviews.length
          : 0,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (isAuthLoading || !user || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-mono">Loading challenge...</p>
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

      <div className="container mx-auto px-4 py-8 mb-20">
        <div className="mb-6">
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-mono font-bold ${
              competitionState === "coding"
                ? "bg-primary/20 text-primary"
                : "bg-yellow-500/20 text-yellow-500"
            }`}
          >
            {competitionState === "coding"
              ? "🔥 Coding Phase Active"
              : "📝 Reviewing Phase"}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 lg:w-[70%]"
          >
            <ChallengeDescription challenge={challenge} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-[30%] space-y-6"
          >
            <StatsCard
              totalParticipants={totalParticipants}
              successfulSubmissions={0}
              estimatedTime="45-60 minutes"
            />

            <SubmitCodeCard />

            <CLICommandsCard />

            <LeaderboardCard
              fastestSolvers={fastestSolvers}
              highestQuality={highestQuality}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
