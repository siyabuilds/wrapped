import { NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import { Wrapped } from "@/db/models/Wrapped";
import {
  fetchFromGitHub,
  getUserContributions,
  GitHubEvent,
  GitHubRepo,
  GitHubUser,
  searchCommits,
} from "@/lib/server/github";
import { calculateStats } from "@/lib/server/stats";
import { config } from "@/lib/server/config";

type RouteContext = {
  params: Promise<{ username: string }> | { username: string };
};

const getUsername = async (context: RouteContext): Promise<string> => {
  const params = await Promise.resolve(context.params);
  return params.username;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    await connectDB();

    const username = await getUsername(context);
    const year = config.year();

    const cachedWrapped = await Wrapped.findByUsernameAndYear(username, year);
    if (cachedWrapped) {
      return NextResponse.json(cachedWrapped);
    }

    let user: GitHubUser;
    try {
      user = await fetchFromGitHub<GitHubUser>(`/users/${username}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("404")) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      throw error;
    }

    const [reposResult, eventsResult, commitSearchResult, contributionsResult] =
      await Promise.allSettled([
        fetchFromGitHub<GitHubRepo[]>(
          `/users/${username}/repos?per_page=100&sort=pushed&direction=desc`
        ),
        fetchFromGitHub<GitHubEvent[]>(`/users/${username}/events/public?per_page=100`),
        searchCommits(username, year),
        getUserContributions(username, year),
      ]);

    const repos = reposResult.status === "fulfilled" ? reposResult.value : [];
    const events = eventsResult.status === "fulfilled" ? eventsResult.value : [];
    const commitSearch =
      commitSearchResult.status === "fulfilled"
        ? commitSearchResult.value
        : ({ total_count: 0 } as Awaited<ReturnType<typeof searchCommits>>);
    const contributions =
      contributionsResult.status === "fulfilled" ? contributionsResult.value : null;

    if (reposResult.status === "rejected") {
      console.warn("Repos fetch failed, continuing with empty repos", reposResult.reason);
    }
    if (eventsResult.status === "rejected") {
      console.warn("Events fetch failed, continuing with empty events", eventsResult.reason);
    }
    if (commitSearchResult.status === "rejected") {
      console.warn("Commit search failed, continuing with fallback", commitSearchResult.reason);
    }
    if (contributionsResult.status === "rejected") {
      console.warn(
        "Contributions fetch failed, continuing with fallback",
        contributionsResult.reason
      );
    }

    const stats = calculateStats(user, repos, events, commitSearch, contributions);

    try {
      const wrapped = await Wrapped.upsertWrapped(username, year, stats);
      return NextResponse.json(wrapped ?? stats);
    } catch (dbError) {
      console.warn("Failed to cache wrapped stats, returning computed stats", dbError);
      return NextResponse.json(stats);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
