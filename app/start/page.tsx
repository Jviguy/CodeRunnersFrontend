"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Code2, User, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/auth";
import { completeOnboarding } from "@/lib/api";

export default function StartPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth({ pageType: "public" });

  const [formData, setFormData] = useState({
    username: "",
    experience: "",
    language: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(
      "[v0] Start page - auth loading:",
      isAuthLoading,
      "user:",
      user,
    );

    if (!isAuthLoading && !user) {
      console.log("[v0] Not authenticated, redirecting to login");
      router.push("/login");
      return;
    }

    if (user) {
      console.log("[v0] Pre-filling form with user data:", user);
      setFormData({
        username: user.username || "",
        experience: user.experience || "",
        language: user.language || "",
      });
    }
  }, [isAuthLoading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    console.log("[v0] Submitting onboarding data:", formData);

    try {
      await completeOnboarding({
        username: formData.username,
        experience: formData.experience || undefined,
        preferred_language: formData.language || undefined,
      });

      console.log("[v0] Onboarding complete, redirecting to challenges");
      await auth.fetchCurrentUser();
      router.push("/challenges");
    } catch (err) {
      console.error("[v0] Error completing onboarding:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to complete onboarding. Please try again.",
      );
      setIsLoading(false);
    }
  };

  const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];
  const languages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Go",
    "Rust",
    "Java",
    "C++",
    "Other",
  ];

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-mono">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-mono">
          Redirecting to login...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
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
            Complete Your <span className="text-primary">Profile</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Let's get you set up before your first challenge
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-sm text-destructive font-sans">{error}</p>
          </div>
        )}

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-xl"
        >
          <div className="space-y-8">
            {/* Username Field */}
            <div className="space-y-3">
              <label
                htmlFor="username"
                className="flex items-center gap-2 text-sm font-mono text-foreground"
              >
                <User className="w-4 h-4 text-primary" />
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder={formData.username || "Enter your username"}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-sans"
              />
            </div>

            {/* Experience Level */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-mono text-foreground">
                <Zap className="w-4 h-4 text-primary" />
                Experience Level
              </label>
              <div className="grid grid-cols-2 gap-3">
                {experienceLevels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, experience: level })
                    }
                    className={`px-4 py-3 rounded-lg border-2 transition-all font-sans ${
                      formData.experience === level
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Language */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-mono text-foreground">
                <Globe className="w-4 h-4 text-primary" />
                Preferred Language
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setFormData({ ...formData, language: lang })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all font-sans ${
                      formData.language === lang
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="mt-12"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              disabled={
                !formData.username ||
                !formData.experience ||
                !formData.language ||
                isLoading
              }
              className="w-full py-6 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Code2 className="w-5 h-5 mr-2" />
              {isLoading ? "Setting up..." : "Start Hacking"}
            </Button>
          </motion.div>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-8 leading-relaxed"
        >
          Your information will be used to tailor challenges to your skill level
        </motion.p>
      </motion.div>
    </div>
  );
}
