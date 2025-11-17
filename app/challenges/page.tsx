"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LoggedInHeader } from "@/components/challenge/logged-in-header";
import { ChallengeDescription } from "@/components/challenge/challenge-description";
import { StatsCard } from "@/components/challenge/stats-card";
import { SubmitCodeCard } from "@/components/challenge/submit-code-card";
import { CLICommandsCard } from "@/components/challenge/cli-commands-card";
import { NoChallengeAvailable } from "@/components/challenge/no-challenge-available";
import { getCurrentChallenge, type Challenge } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";

export default function ChallengePage() {
  const { user } = useAuth({ pageType: "protected" });

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const challengeData = await getCurrentChallenge();
        setChallenge(challengeData);
      } catch (error) {
        console.error("Error fetching challenge:", error);
        setChallenge(null);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!challenge?.ends_at) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const endTime = new Date(challenge.ends_at).getTime();
      const distance = endTime - now;

      if (distance < 0) {
        setTimeRemaining("Challenge Ended");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining(
        days > 0
          ? `${days}d ${hours}h ${minutes}m`
          : `${hours}h ${minutes}m ${seconds}s`,
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [challenge?.ends_at]);

  if (!isMounted) {
    return null;
  }

  if (!challenge || challenge.status !== "Live") {
    return <NoChallengeAvailable />;
  }

  return (
    <div className="min-h-screen bg-background">
      <LoggedInHeader
        username={user?.username || "Loading..."}
        experience={user?.experience || "Intermediate"}
        language={user?.language || "JavaScript"}
      />

      <div className="container mx-auto px-4 py-8 mb-20">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-mono font-bold bg-primary/20 text-primary">
            🔥 Live Challenge
          </span>

          {timeRemaining && (
            <span className="inline-block px-4 py-2 rounded-full text-sm font-mono font-bold bg-red-500/20 text-red-500">
              ⏱️ Ends in: {timeRemaining}
            </span>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 lg:w-[70%]"
          >
            <ChallengeDescription challenge={challenge!} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-[30%] space-y-6"
          >
            <StatsCard
              totalParticipants={0}
              successfulSubmissions={0}
              estimatedTime="45-60 minutes"
            />

            <SubmitCodeCard />

            <CLICommandsCard />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
