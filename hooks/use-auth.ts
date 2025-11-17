import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, type User } from "@/lib/auth";

type PageType = "protected" | "onboarding-only" | "public";

interface UseAuthOptions {
  pageType?: PageType;
  redirectTo?: string;
}

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook to handle authentication for any page
 *
 * @param options.pageType - Type of page protection
 *   - 'protected': Requires active user (redirects to login/onboarding as needed)
 *   - 'onboarding-only': Only for pending_onboarding users (DEPRECATED - use 'public' for /start)
 *   - 'public': No auth required (default)
 *
 * @param options.redirectTo - Manual redirect path (overrides automatic routing)
 *
 * @example
 * // For a protected page like /challenges
 * const { user, isLoading } = useAuth({ pageType: 'protected' })
 *
 * // For the start/onboarding page (allows editing data)
 * const { user, isLoading } = useAuth({ pageType: 'public' })
 */
export function useAuth(options: UseAuthOptions = {}): UseAuthReturn {
  const { pageType = "public", redirectTo } = options;
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (hasChecked) return;

    console.log("[v0] useAuth checking auth, pageType:", pageType);

    async function checkAuth() {
      try {
        const fetchedUser = await auth.fetchCurrentUser();
        console.log("[v0] Fetched user:", fetchedUser);

        if (!fetchedUser) {
          console.log("[v0] No user found");
          setUser(null);

          if (pageType === "protected") {
            console.log("[v0] Protected page, redirecting to login");
            router.push("/login");
          }
          setHasChecked(true);
          setIsLoading(false);
          return;
        }

        if (redirectTo) {
          console.log("[v0] Manual redirect to:", redirectTo);
          router.push(redirectTo);
          setHasChecked(true);
          setIsLoading(false);
          return;
        }

        if (pageType === "protected") {
          if (fetchedUser.status === "pending_onboarding") {
            console.log("[v0] User needs onboarding, redirecting to /start");
            router.push("/start");
            setHasChecked(true);
            setIsLoading(false);
            return;
          }
          if (fetchedUser.status === "suspended") {
            console.log("[v0] User suspended");
            router.push("/suspended");
            setHasChecked(true);
            setIsLoading(false);
            return;
          }
        }

        console.log("[v0] Auth check complete, setting user");
        setUser(fetchedUser);
        setHasChecked(true);
      } catch (err) {
        console.error("[v0] Auth check failed:", err);
        setError("Failed to verify authentication");
        setHasChecked(true);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, [hasChecked, pageType, redirectTo, router]);

  return { user, isLoading, error };
}
