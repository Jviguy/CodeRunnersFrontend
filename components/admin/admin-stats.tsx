"use client";

import { Card } from "@/components/ui/card";
import { Users, Code, Award, TrendingUp } from "lucide-react";
import { type DashboardData } from "@/lib/api";

interface AdminStatsProps {
  data: DashboardData;
}

export function AdminStats({ data }: AdminStatsProps) {
  const stats = [
    {
      title: "Total Users",
      value: data.totalUsers,
      change: `+${data.newUsersToday} today`,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Active Challenges",
      value: data.activeChallenges,
      change: `${data.completedChallenges} completed`,
      icon: Code,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Submissions",
      value: data.totalSubmissions,
      change: `${data.submissionsToday} today`,
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Avg Quality Score",
      value: `${data.avgQualityScore.toFixed(1)}/5.0`,
      change: `${data.reviewsToday} reviews today`,
      icon: Award,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
