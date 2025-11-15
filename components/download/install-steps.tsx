"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function InstallSteps() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="mb-16">
      <h2 className="font-mono text-3xl font-bold mb-8 text-center">
        3-Step Install
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <Card className="p-6 border-2">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-mono font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-mono text-lg font-bold mb-2">
                Download & Unzip
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Download the .zip file for your OS and unzip it.
              </p>
            </div>
          </div>
        </Card>

        {/* Step 2 */}
        <Card className="p-6 border-2">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-mono font-bold flex-shrink-0">
              2
            </div>
            <div className="flex-1">
              <h3 className="font-mono text-lg font-bold mb-2">
                Make it Executable
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-3">
                {
                  "You'll get a single file named 'crucible'. Before you can run it, you need to make it executable:"
                }
              </p>
              <div className="relative group">
                <div className="bg-muted/50 border border-border rounded-lg p-3 font-mono text-sm">
                  chmod +x ./crucible
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard("chmod +x ./crucible", 2)}
                >
                  {copiedStep === 2 ? "Copied!" : "Copy"}
                </Button>
              </div>
              <p className="font-sans text-xs text-muted-foreground mt-2">
                (macOS/Linux only)
              </p>
            </div>
          </div>
        </Card>

        {/* Step 3 */}
        <Card className="p-6 border-2">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-mono font-bold flex-shrink-0">
              3
            </div>
            <div className="flex-1">
              <h3 className="font-mono text-lg font-bold mb-2">Run It!</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-3">
                {
                  "You're all set. Run your first command to see all the options:"
                }
              </p>
              <div className="relative group">
                <div className="bg-muted/50 border border-border rounded-lg p-3 font-mono text-sm">
                  ./crucible --help
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard("./crucible --help", 3)}
                >
                  {copiedStep === 3 ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
