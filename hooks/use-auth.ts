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
  const [user, setUser] = useState<User | null>(() => auth.getCachedUser());
  const [isLoading, setIsLoading] = useState(false); // Initialize as false, render immediately
  const [error, setError] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (hasChecked) return;

    async function checkAuth() {
      try {
        const fetchedUser = await auth.fetchCurrentUser();

        if (!fetchedUser) {
          setUser(null);

          if (pageType === "protected") {
            router.push("/login");
          }
          setHasChecked(true);
          return;
        }

        if (redirectTo) {
          router.push(redirectTo);
          setHasChecked(true);
          return;
        }

        if (pageType === "protected") {
          if (fetchedUser.status === "pending_onboarding") {
            router.push("/start");
            setHasChecked(true);
            return;
          }
          if (fetchedUser.status === "suspended") {
            router.push("/suspended");
            setHasChecked(true);
            return;
          }
        }

        setUser(fetchedUser);
        setHasChecked(true);
      } catch (err) {
        console.error("[v0] Auth check failed:", err);
        setError("Failed to verify authentication");
        setHasChecked(true);
      }
    }

    checkAuth();
  }, [hasChecked, pageType, redirectTo, router]);

  return { user, isLoading, error };
}
