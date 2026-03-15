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

    const [user, repos, events, commitSearch, contributions] = await Promise.all([
      fetchFromGitHub<GitHubUser>(`/users/${username}`),
      fetchFromGitHub<GitHubRepo[]>(`/users/${username}/repos?per_page=100&sort=pushed&direction=desc`),
      fetchFromGitHub<GitHubEvent[]>(`/users/${username}/events/public?per_page=100`),
      searchCommits(username, year),
      getUserContributions(username, year),
    ]);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const stats = calculateStats(user, repos, events, commitSearch, contributions);
    const wrapped = await Wrapped.upsertWrapped(username, year, stats);

    return NextResponse.json(wrapped);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
