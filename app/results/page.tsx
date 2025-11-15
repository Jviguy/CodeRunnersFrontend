"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoggedInHeader } from "@/components/challenge/logged-in-header";
import { MyEgoCheck } from "@/components/results/my-ego-check";
import { CrucibleLeaderboards } from "@/components/results/crucible-leaderboards";

export default function ResultsPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<{
    username: string;
    experience: string;
    language: string;
  } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("crucibleUser");
    if (!storedUser) {
      router.push("/start");
      return;
    }
    setUserData(JSON.parse(storedUser));
  }, [router]);

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

      <main className="container mx-auto px-4 py-8 space-y-8">
        <MyEgoCheck username={userData.username} />
        <CrucibleLeaderboards />
      </main>
    </div>
  );
}
