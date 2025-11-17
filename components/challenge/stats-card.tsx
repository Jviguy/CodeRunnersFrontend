import { Users, Trophy, Clock } from "lucide-react";

interface StatsCardProps {
  totalParticipants: number;
  successfulSubmissions: number;
  estimatedTime: string;
}

export function StatsCard({
  totalParticipants,
  successfulSubmissions,
  estimatedTime,
}: StatsCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-xl font-bold text-foreground mb-6 font-mono">
        Stats
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground font-sans">
              Total Participants
            </span>
          </div>
          <span className="text-2xl font-bold text-foreground font-mono">
            {totalParticipants}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground font-sans">
              Successful Submissions
            </span>
          </div>
          <span className="text-2xl font-bold text-foreground font-mono">
            {successfulSubmissions}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground font-sans">
              Estimated Time
            </span>
          </div>
          <span className="text-lg font-bold text-foreground font-sans">
            {estimatedTime}
          </span>
        </div>
      </div>
    </div>
  );
}
