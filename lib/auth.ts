// JWT Claims interface matching the Rust backend
export interface JWTClaims {
  sub: string; // UUID
  role: "user" | "admin";
  status: "pending_onboarding" | "active" | "suspended";
  exp: number;
}

// User data interface
export interface User {
  id: string;
  role: "user" | "admin";
  status: "pending_onboarding" | "active" | "suspended";
  // Additional fields will come from /api/user/me endpoint
  username?: string;
  experience?: string;
  language?: string;
}

const USER_KEY = "crucible_user";

export const auth = {
  // Fetch current user from backend (cookie is sent automatically)
  async fetchCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch("http://localhost:8000/api/user/me", {
        credentials: "include", // Important: send cookies with request
      });

      if (!response.ok) {
        return null;
      }

      const userData = await response.json();

      // Cache user data locally
      if (typeof window !== "undefined") {
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
      }

      return userData;
    } catch (error) {
      console.error("[v0] Failed to fetch current user:", error);
      return null;
    }
  },

  // Get cached user (for immediate access without API call)
  getCachedUser(): User | null {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(USER_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    }
    return null;
  },

  // Clear cached user data
  clearUser() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_KEY);
    }
  },

  // Logout by calling backend and clearing cache
  async logout() {
    try {
      await fetch("http://localhost:8000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("[v0] Logout error:", error);
    } finally {
      this.clearUser();
    }
  },

  // Check if user is authenticated by trying to fetch user data
  async isAuthenticated(): Promise<boolean> {
    const user = await this.fetchCurrentUser();
    return user !== null;
  },

  // Check if user needs onboarding
  async needsOnboarding(): Promise<boolean> {
    const user = await this.fetchCurrentUser();
    return user?.status === "pending_onboarding";
  },

  async getRequiredRoute(currentPath: string): Promise<string | null> {
    const user = await this.fetchCurrentUser();

    // Not authenticated - must go to login (unless already there)
    if (!user) {
      return currentPath === "/login" ? null : "/login";
    }

    // Suspended users can't access anything
    if (user.status === "suspended") {
      return "/suspended"; // TODO: Create suspended page
    }

    // Pending onboarding - must complete onboarding first
    if (user.status === "pending_onboarding") {
      return currentPath === "/start" ? null : "/start";
    }

    // Active users can't access onboarding or login pages
    if (user.status === "active") {
      if (currentPath === "/start" || currentPath === "/login") {
        return "/challenges";
      }
      return null; // User is where they should be
    }

    return null;
  },

  // Initiate GitHub OAuth login
  loginWithGitHub() {
    window.location.href = "http://localhost:8000/api/auth/login/github";
  },

  // Initiate Google OAuth login (placeholder for future implementation)
  loginWithGoogle() {
    // TODO: Implement when backend adds Google OAuth
    console.log("[v0] Google OAuth not yet implemented");
  },
};
