import { auth } from "./auth";

export async function getStartRedirectPath(): Promise<string> {
  const user = await auth.fetchCurrentUser();

  if (!user) {
    return "/login";
  }

  if (user.status === "pending_onboarding") {
    return "/start";
  }

  // Active users always go to challenges
  return "/challenges";
}

export async function guardRoute(currentPath: string): Promise<string | null> {
  return await auth.getRequiredRoute(currentPath);
}
