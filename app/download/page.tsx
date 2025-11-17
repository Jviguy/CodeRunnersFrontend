"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoggedInHeader } from "@/components/challenge/logged-in-header";
import { DownloadCards } from "@/components/download/download-cards";
import { InstallSteps } from "@/components/download/install-steps";
import { NextStepsCard } from "@/components/download/next-steps-card";
import { useAuth } from "@/hooks/use-auth";

export default function DownloadPage() {
  const { user, isLoading } = useAuth({ pageType: "protected" });

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-mono">Loading...</p>
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
