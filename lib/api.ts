import { auth } from "./auth";

const API_BASE_URL = "http://localhost:8000";

export interface Challenge {
  Title: string;
  Description: string;
  InputFormat: string;
  OutputFormat: string;
  TestCases?: any[];
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
  const response = await fetchWithAuth("/challenge", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch challenge");
  }

  return response.json();
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
