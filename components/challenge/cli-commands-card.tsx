"use client";

import { useState } from "react";
import { Copy, Check, Download, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CLICommandsCard() {
  const [copiedChmod, setCopiedChmod] = useState(false);
  const [copiedDownload, setCopiedDownload] = useState(false);
  const [copiedSubmit, setCopiedSubmit] = useState(false);

  const copyToClipboard = (
    text: string,
    type: "chmod" | "download" | "submit",
  ) => {
    navigator.clipboard.writeText(text);
    if (type === "chmod") {
      setCopiedChmod(true);
      setTimeout(() => setCopiedChmod(false), 2000);
    } else if (type === "download") {
      setCopiedDownload(true);
      setTimeout(() => setCopiedDownload(false), 2000);
    } else {
      setCopiedSubmit(true);
      setTimeout(() => setCopiedSubmit(false), 2000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-card border-2 border-primary/30 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-foreground mb-6 font-mono">
        Action Hub
      </h3>

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold font-mono">1</span>
            </div>
            <p className="text-sm font-bold text-foreground font-mono">
              Download the CLI
            </p>
          </div>

          <div className="ml-10 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <Link href="/download">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full font-mono text-xs"
                >
                  <Apple className="w-3 h-3 mr-1" />
                  macOS
                </Button>
              </Link>
              <Link href="/download">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full font-mono text-xs"
                >
                  <svg
                    className="w-3 h-3 mr-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                  </svg>
                  Win
                </Button>
              </Link>
              <Link href="/download">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full font-mono text-xs"
                >
                  <svg
                    className="w-3 h-3 mr-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.41 1.684-.287 2.489.107.714.32 1.423.63 2.093l.427.237c.691.422 1.347.936 1.94 1.563.296.313.567.653.81 1.017l.343.573.304.615c.31.67.523 1.379.63 2.093.123.805-.009 1.649-.287 2.489-.589 1.771-1.831 3.47-2.716 4.521-.75 1.067-.974 1.928-1.05 3.02-.065 1.491.944 5.965 3.17 6.298.165.013.325.021.48.021 4.226 0 3.105-4.807 3.17-6.298.076-1.092.3-1.953 1.05-3.02.885-1.051 2.127-2.75 2.716-4.521.278-.84.41-1.684.287-2.489-.107-.714-.32-1.423-.63-2.093l-.304-.615-.343-.573c-.243-.364-.514-.704-.81-1.017-.593-.627-1.249-1.141-1.94-1.563l-.427-.237c-.31-.67-.523-1.379-.63-2.093-.123-.805.009-1.649.287-2.489.589-1.771 1.831-3.47 2.716-4.521.75-1.067.974-1.928 1.05-3.02.065-1.491-.944-5.965-3.17-6.298z" />
                  </svg>
                  Linux
                </Button>
              </Link>
            </div>

            <div className="bg-muted/30 border border-border rounded p-2">
              <p className="text-xs text-muted-foreground mb-2 font-sans">
                Mac/Linux tip:
              </p>
              <div className="relative">
                <div className="bg-background/80 border border-border rounded p-2 pr-8 font-mono text-xs text-foreground overflow-x-auto">
                  chmod +x ./crucible
                </div>
                <button
                  onClick={() =>
                    copyToClipboard("chmod +x ./crucible", "chmod")
                  }
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded transition-colors"
                >
                  {copiedChmod ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <Copy className="w-3 h-3 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold font-mono">2</span>
            </div>
            <p className="text-sm font-bold text-foreground font-mono">
              Get Your Challenge
            </p>
          </div>

          <div className="ml-10">
            <p className="text-xs text-muted-foreground mb-2 font-sans">
              Once the CLI is installed, run this command in your terminal:
            </p>
            <div className="relative">
              <div className="bg-background/80 border border-border rounded-lg p-3 pr-12 font-mono text-sm text-foreground overflow-x-auto">
                crucible download
              </div>
              <button
                onClick={() => copyToClipboard("crucible download", "download")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-accent rounded-md transition-colors"
              >
                {copiedDownload ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold font-mono">3</span>
            </div>
            <p className="text-sm font-bold text-foreground font-mono">
              Submit Your Solution
            </p>
          </div>

          <div className="ml-10">
            <p className="text-xs text-muted-foreground mb-2 font-sans">
              When your output.json is ready, submit it:
            </p>
            <div className="relative">
              <div className="bg-background/80 border border-border rounded-lg p-3 pr-12 font-mono text-sm text-foreground overflow-x-auto">
                crucible submit --output=my_output.json
              </div>
              <button
                onClick={() =>
                  copyToClipboard(
                    "crucible submit --output=my_output.json",
                    "submit",
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-accent rounded-md transition-colors"
              >
                {copiedSubmit ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold font-mono">4</span>
            </div>
            <p className="text-sm font-bold text-foreground font-mono">
              See Your 'Ego Check'
            </p>
          </div>

          <div className="ml-10">
            <p className="text-xs text-muted-foreground mb-3 font-sans">
              After you submit, come back here to see your Gemini review and
              leaderboard rank.
            </p>
            <Link href="/results">
              <Button className="w-full font-mono" size="sm">
                View Results & Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
