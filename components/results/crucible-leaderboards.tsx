"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Trophy, Clock } from "lucide-react";
import { ReviewCodeModal } from "@/components/results/review-code-modal";

interface LeaderboardEntry {
  rank: number;
  username: string;
  time?: string;
  geminiScore?: number;
  peerRating: number;
  code: string;
}

export function CrucibleLeaderboards() {
  const [selectedUser, setSelectedUser] = useState<LeaderboardEntry | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - in production this would come from an API
  const speedLeaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      username: "speedDemon42",
      time: "10m 15s",
      peerRating: 4.2,
      code: "// Speed optimized solution\nfunction solve(input) {\n  return input.sort().join('');\n}",
    },
    {
      rank: 2,
      username: "fastCoder",
      time: "12m 43s",
      peerRating: 3.8,
      code: "// Quick solution\nconst solve = (arr) => arr.reduce((a,b) => a+b, 0);",
    },
    {
      rank: 3,
      username: "lightning_dev",
      time: "15m 22s",
      peerRating: 4.5,
      code: "// Fast implementation\nfunction solve(data) {\n  let result = [];\n  for(let i=0; i<data.length; i++){\n    result.push(data[i]*2);\n  }\n  return result;\n}",
    },
  ];

  const qualityLeaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      username: "cleanCodeKing",
      geminiScore: 4.8,
      peerRating: 4.9,
      code: "/**\n * Solves the challenge with optimal performance\n * @param {Array} input - The input array\n * @returns {number} The computed result\n */\nfunction solve(input) {\n  if (!Array.isArray(input)) {\n    throw new TypeError('Input must be an array');\n  }\n  \n  return input.reduce((sum, val) => sum + val, 0);\n}",
    },
    {
      rank: 2,
      username: "architectGuru",
      geminiScore: 4.6,
      peerRating: 4.7,
      code: "// Well-documented solution\nclass Solver {\n  constructor(data) {\n    this.data = data;\n  }\n  \n  solve() {\n    return this.data.map(x => x * 2);\n  }\n}",
    },
    {
      rank: 3,
      username: "elegantDev",
      geminiScore: 4.5,
      peerRating: 4.3,
      code: "// Clean and readable\nconst solve = (arr) => {\n  const isValid = arr.every(x => typeof x === 'number');\n  if (!isValid) return null;\n  \n  return arr.filter(x => x > 0);\n}",
    },
  ];

  const handleReviewClick = (entry: LeaderboardEntry) => {
    setSelectedUser(entry);
    setIsModalOpen(true);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= Math.round(rating)
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  const renderLeaderboardTable = (
    data: LeaderboardEntry[],
    type: "speed" | "quality",
  ) => {
    return (
      <div className="space-y-2">
        {data.map((entry) => (
          <Card
            key={entry.rank}
            className="p-4 bg-card border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Rank */}
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
                {entry.rank <= 3 ? (
                  <Trophy
                    className={`w-6 h-6 ${
                      entry.rank === 1
                        ? "text-yellow-500"
                        : entry.rank === 2
                          ? "text-gray-400"
                          : "text-orange-600"
                    }`}
                  />
                ) : (
                  <span className="font-mono font-bold text-lg text-muted-foreground">
                    {entry.rank}
                  </span>
                )}
              </div>

              {/* Username with Avatar */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar className="w-10 h-10 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-mono">
                    {entry.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-mono font-semibold text-foreground truncate">
                  {entry.username}
                </span>
              </div>

              {/* Metric */}
              <div className="flex items-center gap-2 w-32">
                {type === "speed" ? (
                  <>
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-mono text-sm font-semibold text-foreground">
                      {entry.time}
                    </span>
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4 text-primary" />
                    <span className="font-mono text-sm font-semibold text-foreground">
                      {entry.geminiScore}/5
                    </span>
                  </>
                )}
              </div>

              {/* Peer Rating */}
              <div className="flex items-center gap-2 w-32">
                {renderStars(entry.peerRating)}
                <span className="font-mono text-xs text-muted-foreground">
                  {entry.peerRating}/5
                </span>
              </div>

              {/* Action Button */}
              <Button
                onClick={() => handleReviewClick(entry)}
                className="font-mono"
                size="sm"
              >
                Review Code
              </Button>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold font-mono text-primary">
          The Crucible Leaderboards
        </h2>

        <Tabs defaultValue="speed" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="speed" className="font-mono">
              Speed Ranking
            </TabsTrigger>
            <TabsTrigger value="quality" className="font-mono">
              Quality Ranking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="speed" className="space-y-4">
            {renderLeaderboardTable(speedLeaderboard, "speed")}
          </TabsContent>

          <TabsContent value="quality" className="space-y-4">
            {renderLeaderboardTable(qualityLeaderboard, "quality")}
          </TabsContent>
        </Tabs>
      </div>

      <ReviewCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
    </>
  );
}
