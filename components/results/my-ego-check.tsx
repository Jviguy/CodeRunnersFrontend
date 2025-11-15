"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star } from "lucide-react";

interface MyEgoCheckProps {
  username: string;
}

export function MyEgoCheck({ username }: MyEgoCheckProps) {
  // Mock data - in production this would come from an API
  const mockCode = `function findMostFrequent(arr) {
  let count = {};
  let max = 0;
  let result = null;

  for (let i = 0; i < arr.length; i++) {
    if (!count[arr[i]]) {
      count[arr[i]] = 0;
    }
    count[arr[i]]++;

    if (count[arr[i]] > max) {
      max = count[arr[i]];
      result = arr[i];
    }
  }

  return result;
}`;

  const mockRoast =
    "Your code works, but it's a 3-star mess of over-engineered spaghetti. You're using unnecessary loops and object initialization that could be simplified. While the logic is sound, the readability suffers from verbose variable names and redundant conditionals. A developer-friendly refactor would cut this down by 30%.";

  const scores = {
    readability: 4,
    maintainability: 2,
    efficiency: 4,
    overall: 3.3,
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold font-mono text-primary">
        My Gemini &apos;Ego Check&apos;
      </h2>

      <Card className="bg-card border-primary/20 shadow-lg shadow-primary/5">
        <div className="grid lg:grid-cols-2 gap-6 p-6">
          {/* Left Side: Code */}
          <div className="space-y-3">
            <h3 className="text-lg font-mono font-semibold text-foreground">
              Your Submitted Code
            </h3>
            <ScrollArea className="h-[400px] rounded-lg border border-border bg-muted/30">
              <pre className="p-4 font-mono text-sm text-foreground">
                <code>{mockCode}</code>
              </pre>
            </ScrollArea>
          </div>

          {/* Right Side: Gemini Review */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-lg font-mono font-semibold text-primary">
                Gemini&apos;s Roast
              </h3>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                {mockRoast}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="text-lg font-mono font-semibold text-foreground">
                Gemini&apos;s Score
              </h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm text-muted-foreground">
                    Readability:
                  </span>
                  <div className="flex items-center gap-2">
                    {renderStars(scores.readability)}
                    <span className="font-mono text-sm font-semibold text-foreground">
                      {scores.readability}/5
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm text-muted-foreground">
                    Maintainability:
                  </span>
                  <div className="flex items-center gap-2">
                    {renderStars(scores.maintainability)}
                    <span className="font-mono text-sm font-semibold text-foreground">
                      {scores.maintainability}/5
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm text-muted-foreground">
                    Efficiency:
                  </span>
                  <div className="flex items-center gap-2">
                    {renderStars(scores.efficiency)}
                    <span className="font-mono text-sm font-semibold text-foreground">
                      {scores.efficiency}/5
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-primary/20">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg font-bold text-foreground">
                    Overall Gemini Score:
                  </span>
                  <div className="flex items-center gap-3">
                    {renderStars(Math.round(scores.overall))}
                    <span className="font-mono text-2xl font-bold text-primary">
                      {scores.overall}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
