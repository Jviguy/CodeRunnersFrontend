"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoggedInHeader } from "@/components/challenge/logged-in-header";
import { DownloadCards } from "@/components/download/download-cards";
import { InstallSteps } from "@/components/download/install-steps";
import { NextStepsCard } from "@/components/download/next-steps-card";

export default function DownloadPage() {
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

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Headline Section */}
        <div className="text-center mb-16">
          <h1 className="font-mono text-5xl md:text-6xl font-bold mb-4 text-balance">
            Download the Crucible CLI
          </h1>
          <p className="font-sans text-xl text-muted-foreground text-balance">
            A single, blazing-fast binary for your OS. No dependencies required.
          </p>
        </div>

        {/* Download Links Section */}
        <DownloadCards />

        {/* Quick Start Instructions */}
        <InstallSteps />

        {/* Next Steps Section */}
        <NextStepsCard />
      </div>
    </div>
  );
}
