"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Code2,
  Users,
  Clock,
  Trophy,
  Star,
  ChevronDown,
  Settings,
  LogOut,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { LoggedInHeader } from "@/components/challenge/logged-in-header";
import { ChallengeDescription } from "@/components/challenge/challenge-description";
import { StatsCard } from "@/components/challenge/stats-card";
import { CLICommandsCard } from "@/components/challenge/cli-commands-card";
import { LeaderboardCard } from "@/components/challenge/leaderboard-card";

export default function ChallengePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<{
    username: string;
    experience: string;
    language: string;
  } | null>(null);
  const [copiedDownload, setCopiedDownload] = useState(false);
  const [copiedSubmit, setCopiedSubmit] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("crucibleUser");
    if (stored) {
      setUserData(JSON.parse(stored));
    } else {
      router.push("/start");
    }
  }, [router]);

  const handleChangeData = () => {
    router.push("/start");
  };

  const handleSignOut = () => {
    localStorage.removeItem("crucibleUser");
    router.push("/");
  };

  const copyToClipboard = (text: string, type: "download" | "submit") => {
    navigator.clipboard.writeText(text);
    if (type === "download") {
      setCopiedDownload(true);
      setTimeout(() => setCopiedDownload(false), 2000);
    } else {
      setCopiedSubmit(true);
      setTimeout(() => setCopiedSubmit(false), 2000);
    }
  };

  // Mock data
  const challengeData = {
    totalParticipants: 128,
    successfulSubmissions: 42,
    estimatedTime: "45-60 minutes",
    fastestSolvers: [
      { username: "user_alpha", time: "10m 5s" },
      { username: "user_beta", time: "12m 20s" },
      { username: "user_gamma", time: "13m 4s" },
    ],
    highestQuality: [
      { username: "user_delta", score: 5.0 },
      { username: "user_alpha", score: 4.8 },
      { username: "user_zeta", score: 4.7 },
    ],
  };

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <LoggedInHeader
        username={userData.username}
        experience={userData.experience}
        language={userData.language}
      />

      <div className="container mx-auto px-4 py-8 mb-20">
        <div className="flex flex-col lg:flex-row gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 lg:w-[70%]"
          >
            <ChallengeDescription />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-[30%] space-y-6"
          >
            <StatsCard
              totalParticipants={challengeData.totalParticipants}
              successfulSubmissions={challengeData.successfulSubmissions}
              estimatedTime={challengeData.estimatedTime}
            />

            <CLICommandsCard />

            <LeaderboardCard
              fastestSolvers={challengeData.fastestSolvers}
              highestQuality={challengeData.highestQuality}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
