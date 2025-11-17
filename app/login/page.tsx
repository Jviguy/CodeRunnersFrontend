"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Code2, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    async function inner() {
      // If already authenticated, redirect based on onboarding status
      if (await auth.isAuthenticated()) {
        if (await auth.needsOnboarding()) {
          router.push("/start");
        } else {
          router.push("/challenges");
        }
      }
    }
    inner();
  }, [router]);

  const handleGitHubLogin = () => {
    auth.loginWithGitHub();
  };

  const handleGoogleLogin = () => {
    auth.loginWithGoogle();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #000000",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6"
          >
            <Code2 className="w-10 h-10 text-primary" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 font-mono">
            Welcome to <span className="text-primary">The Crucible</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Sign in to start testing your code
          </p>
        </div>

        {/* Login Options */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-xl"
        >
          <div className="space-y-4">
            {/* GitHub Login */}
            <Button
              onClick={handleGitHubLogin}
              className="w-full py-6 text-lg font-bold bg-[#24292e] hover:bg-[#1a1e22] text-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3"
            >
              <Github className="w-6 h-6" />
              Continue with GitHub
            </Button>

            {/* Google Login - Coming Soon */}
            <Button
              onClick={handleGoogleLogin}
              disabled
              className="w-full py-6 text-lg font-bold bg-white hover:bg-gray-50 text-gray-900 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
              <span className="text-xs ml-2">(Coming Soon)</span>
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground leading-relaxed">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <a
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to home
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
