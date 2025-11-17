"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import { Code2 } from "lucide-react";

export default function CallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log(
          "[v0] OAuth callback received, verifying authentication...",
        );

        // Fetch user data (cookie is sent automatically with credentials: 'include')
        const user = await auth.fetchCurrentUser();

        if (!user) {
          setError("Authentication failed. No user data received.");
          setTimeout(() => router.push("/login"), 3000);
          return;
        }

        console.log("[v0] User authenticated:", user);

        // Check if user is suspended
        if (user.status === "suspended") {
          setError("Your account has been suspended");
          auth.clearUser();
          return;
        }

        // Redirect based on onboarding status
        if (user.status === "pending_onboarding") {
          console.log("[v0] User needs onboarding, redirecting to /start");
          router.push("/start");
        } else {
          console.log("[v0] User active, redirecting to /challenges");
          router.push("/challenges");
        }
      } catch (err) {
        console.error("[v0] Error in OAuth callback:", err);
        setError("Authentication failed. Please try again.");
        setTimeout(() => router.push("/login"), 3000);
      }
    };

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/20 mb-6">
            <Code2 className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4 font-mono">
            Authentication Error
          </h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <p className="text-sm text-muted-foreground">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6 animate-pulse">
          <Code2 className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-4 font-mono">
          Completing sign in...
        </h1>
        <p className="text-muted-foreground">
          Please wait while we set up your account
        </p>
      </div>
    </div>
  );
}
