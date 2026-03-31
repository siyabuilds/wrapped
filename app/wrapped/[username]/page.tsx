"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorView, LoadingView, NoActivityView, WrappedView } from "@/components/views";
import type { WrappedStats } from "@/types/wrapped";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type RouteViewState = "loading" | "wrapped" | "no-activity" | "error";

const isWrappedYearActive = (stats: WrappedStats): boolean => {
  const hasYearActivityField = (stats as Partial<WrappedStats>).hasYearActivity;

  if (typeof hasYearActivityField === "boolean") {
    return hasYearActivityField;
  }

  return (
    stats.totalContributions > 0 ||
    stats.totalCommits > 0 ||
    stats.activeDays > 0 ||
    stats.totalEvents > 0
  );
};

interface WrappedUsernamePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default function WrappedUsernamePage({ params }: WrappedUsernamePageProps) {
  const router = useRouter();
  const { username: rawUsername } = use(params);
  const username = decodeURIComponent(rawUsername);

  const [viewState, setViewState] = useState<RouteViewState>("loading");
  const [stats, setStats] = useState<WrappedStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const fetchWrapped = async () => {
      setViewState("loading");
      setError("");
      setStats(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/wrapped/${encodeURIComponent(username)}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`User "${username}" not found on GitHub`);
          }
          throw new Error("Failed to fetch wrapped stats. Please try again.");
        }

        const data = (await response.json()) as WrappedStats;
        if (!isActive) return;
        setStats(data);
        setViewState(isWrappedYearActive(data) ? "wrapped" : "no-activity");
      } catch (err) {
        if (!isActive) return;
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
        setViewState("error");
      }
    };

    fetchWrapped();

    return () => {
      isActive = false;
    };
  }, [username]);

  if (viewState === "loading") {
    return <LoadingView username={username} />;
  }

  if (viewState === "error") {
    return <ErrorView error={error} onBack={() => router.push("/")} />;
  }

  if (viewState === "no-activity") {
    return (
      <NoActivityView
        username={username}
        year={stats?.year ?? new Date().getFullYear() - 1}
        onBack={() => router.push("/")}
      />
    );
  }

  if (!stats) {
    return <ErrorView error="Wrapped data is unavailable." onBack={() => router.push("/")} />;
  }

  return <WrappedView stats={stats} onBack={() => router.push("/")} />;
}