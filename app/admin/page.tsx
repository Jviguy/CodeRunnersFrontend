"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { AdminStats } from "@/components/admin/admin-stats";
import { AdminCharts } from "@/components/admin/admin-charts";
import { AdminHeader } from "@/components/admin/admin-header";
import { RecentActivity } from "@/components/admin/recent-activity";
import { UserManagement } from "@/components/admin/user-management";
import { ChallengeManagement } from "@/components/admin/challenge-management";
import { getDashboardData, type DashboardData } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
  const { user } = useAuth({ pageType: "protected" });
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/challenges");
    }
  }, [user, router]);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (user?.role === "admin") {
      fetchDashboard();
    }
  }, [user]);

  if (!isMounted) {
    return null;
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">
            You must be an administrator to access this page.
          </p>
        </Card>
      </div>
    );
  }

  if (isLoading || !dashboardData) {
    return (
      <div className="min-h-screen bg-background">
        <AdminHeader username={user.username || "Admin"} />
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-20 bg-muted rounded" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader username={user.username || "Admin"} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor platform activity and manage users
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="challenges">Challenge Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <AdminStats data={dashboardData} />

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <AdminCharts data={dashboardData} />
              </div>

              <div>
                <RecentActivity activities={dashboardData.recentActivity} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="challenges">
            <ChallengeManagement />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement users={dashboardData.users} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
