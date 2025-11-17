import { auth } from "./auth";

const API_BASE_URL = "http://localhost:8000";

export interface Challenge {
  title: string;
  prompt: string;
  input_file_url: string;
  ends_at: string; // ISO 8601 timestamp
  status: "Live" | "Ended";
}

export interface SourceFile {
  Name: string;
  Code: string;
}

export interface Review {
  ReviewerName: string;
  Stars: number;
  Msg: string;
  Timestamp?: string;
}

export interface Submission {
  Source: SourceFile[];
  Reviews: Review[] | null;
  Author: string;
}

export interface User {
  id: string;
  username: string;
}

export interface ApiState {
  State: "coding" | "reviewing";
}

export interface OnboardingPayload {
  username: string;
  experience?: string;
  preferred_language?: string;
}

// Admin Dashboard types
export interface DashboardData {
  totalUsers: number;
  newUsersToday: number;
  activeChallenges: number;
  completedChallenges: number;
  totalSubmissions: number;
  submissionsToday: number;
  avgQualityScore: number;
  reviewsToday: number;
  userGrowth: Array<{ date: string; users: number }>;
  submissionsByLanguage: Array<{ language: string; count: number }>;
  recentActivity: Array<{
    id: string;
    type: "submission" | "review" | "user_joined";
    username: string;
    description: string;
    timestamp: string;
  }>;
  users: Array<{
    id: string;
    username: string;
    email: string;
    status: "active" | "pending_onboarding" | "suspended";
    role: "user" | "admin";
    submissions: number;
    joinedAt: string;
  }>;
}

// Challenge management types
export interface ChallengeFormData {
  title: string;
  prompt: string;
  input_file_url: string;
  starts_at: string;
  ends_at: string;
}

export interface ChallengeListItem {
  id: string;
  title: string;
  status: "Live" | "Ended" | "Scheduled";
  starts_at: string;
  ends_at: string;
  submissions: number;
}

// Helper function to make authenticated requests
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include", // Send cookies with request
  });

  // Handle 401 Unauthorized - redirect to login
  if (response.status === 401) {
    window.location.href = "/login";
    throw new Error("Authentication required");
  }

  return response;
}

// User API
export async function getCurrentUser(): Promise<any> {
  const response = await fetchWithAuth("/api/user/me", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const user = await response.json();
  auth.setUser(user);
  return user;
}

export async function getUsers(): Promise<User[]> {
  const response = await fetchWithAuth("/get_users", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function completeOnboarding(
  data: OnboardingPayload,
): Promise<any> {
  const response = await fetchWithAuth("/api/user/onboarding", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Failed to complete onboarding" }));
    throw new Error(error.message || "Failed to complete onboarding");
  }

  return response.json();
}

// Challenge API
export async function getCurrentChallenge(): Promise<Challenge> {
  const response = await fetchWithAuth("/api/challenge", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch challenge");
  }

  return response.json();
}

// Challenge management API functions
export async function getAllChallenges(): Promise<ChallengeListItem[]> {
  // TODO: Replace with real API call when backend is ready
  // const response = await fetchWithAuth('/api/admin/challenges', { method: 'GET' })
  // return response.json()

  // Mock data for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          title: "Binary Search Tree Implementation",
          status: "Live",
          starts_at: new Date().toISOString(),
          ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          submissions: 234,
        },
        {
          id: "2",
          title: "Graph Traversal Algorithm",
          status: "Ended",
          starts_at: new Date(
            Date.now() - 14 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          ends_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          submissions: 456,
        },
        {
          id: "3",
          title: "Dynamic Programming Challenge",
          status: "Scheduled",
          starts_at: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          ends_at: new Date(
            Date.now() + 14 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          submissions: 0,
        },
      ]);
    }, 300);
  });
}

export async function createChallenge(data: ChallengeFormData): Promise<any> {
  // TODO: Replace with real API call when backend is ready
  // const response = await fetchWithAuth('/api/admin/challenges', {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // })
  // return response.json()

  console.log("[v0] Creating challenge:", data);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 500);
  });
}

export async function updateChallenge(
  id: string,
  data: ChallengeFormData,
): Promise<any> {
  // TODO: Replace with real API call when backend is ready
  // const response = await fetchWithAuth(`/api/admin/challenges/${id}`, {
  //   method: 'PUT',
  //   body: JSON.stringify(data),
  // })
  // return response.json()

  console.log("[v0] Updating challenge:", id, data);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 500);
  });
}

export async function deleteChallenge(id: string): Promise<any> {
  // TODO: Replace with real API call when backend is ready
  // const response = await fetchWithAuth(`/api/admin/challenges/${id}`, {
  //   method: 'DELETE',
  // })
  // return response.json()

  console.log("[v0] Deleting challenge:", id);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 500);
  });
}

// Submission API
export async function getSubmissions(): Promise<Submission[]> {
  const response = await fetchWithAuth("/get_submissions", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch submissions");
  }

  return response.json();
}

export async function submitSolution(sourceFiles: SourceFile[]): Promise<any> {
  const response = await fetchWithAuth("/submit", {
    method: "POST",
    body: JSON.stringify({
      Source: sourceFiles,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit solution");
  }

  return response.json();
}

// Review API
export async function addCodeReview(
  targetUser: string,
  stars: number,
  review: string,
): Promise<any> {
  const response = await fetchWithAuth("/add_code_review", {
    method: "POST",
    body: JSON.stringify({
      TargetUser: targetUser,
      Stars: stars,
      Review: review,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit code review");
  }

  return response.json();
}

// Competition state API
export async function getCompetitionState(): Promise<ApiState> {
  const response = await fetchWithAuth("/get_state", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch competition state");
  }

  return response.json();
}

// Admin Dashboard API - will use real endpoint later
export async function getDashboardData(): Promise<DashboardData> {
  // TODO: Replace with real API call to /api/admin/dashboard when backend is ready
  // const response = await fetchWithAuth('/api/admin/dashboard', { method: 'GET' })
  // return response.json()

  // Mock data for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalUsers: 1247,
        newUsersToday: 23,
        activeChallenges: 1,
        completedChallenges: 42,
        totalSubmissions: 3891,
        submissionsToday: 157,
        avgQualityScore: 4.2,
        reviewsToday: 89,
        userGrowth: [
          { date: "Mon", users: 45 },
          { date: "Tue", users: 52 },
          { date: "Wed", users: 49 },
          { date: "Thu", users: 63 },
          { date: "Fri", users: 58 },
          { date: "Sat", users: 71 },
          { date: "Sun", users: 67 },
        ],
        submissionsByLanguage: [
          { language: "Python", count: 1245 },
          { language: "JavaScript", count: 987 },
          { language: "C", count: 654 },
          { language: "Rust", count: 523 },
          { language: "Go", count: 482 },
        ],
        recentActivity: [
          {
            id: "1",
            type: "submission",
            username: "alice_dev",
            description: 'Submitted solution for "Binary Search Tree"',
            timestamp: "2 minutes ago",
          },
          {
            id: "2",
            type: "review",
            username: "bob_codes",
            description: "Reviewed alice_dev's submission (5 stars)",
            timestamp: "5 minutes ago",
          },
          {
            id: "3",
            type: "user_joined",
            username: "charlie_x",
            description: "Joined the platform",
            timestamp: "12 minutes ago",
          },
          {
            id: "4",
            type: "submission",
            username: "dave_tech",
            description: 'Submitted solution for "Binary Search Tree"',
            timestamp: "18 minutes ago",
          },
          {
            id: "5",
            type: "review",
            username: "eve_programmer",
            description: "Reviewed dave_tech's submission (4 stars)",
            timestamp: "23 minutes ago",
          },
          {
            id: "6",
            type: "submission",
            username: "frank_master",
            description: 'Submitted solution for "Binary Search Tree"',
            timestamp: "35 minutes ago",
          },
        ],
        users: [
          {
            id: "1",
            username: "alice_dev",
            email: "alice@example.com",
            status: "active",
            role: "user",
            submissions: 23,
            joinedAt: "2024-01-15",
          },
          {
            id: "2",
            username: "bob_codes",
            email: "bob@example.com",
            status: "active",
            role: "user",
            submissions: 45,
            joinedAt: "2024-01-10",
          },
          {
            id: "3",
            username: "charlie_x",
            email: "charlie@example.com",
            status: "pending_onboarding",
            role: "user",
            submissions: 0,
            joinedAt: "2024-03-20",
          },
          {
            id: "4",
            username: "admin_user",
            email: "admin@crucible.com",
            status: "active",
            role: "admin",
            submissions: 12,
            joinedAt: "2024-01-01",
          },
          {
            id: "5",
            username: "dave_tech",
            email: "dave@example.com",
            status: "active",
            role: "user",
            submissions: 34,
            joinedAt: "2024-02-05",
          },
        ],
      });
    }, 300); // Simulate network delay
  });
}
