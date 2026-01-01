import { useState } from "react";
import {
  InputView,
  LoadingView,
  ErrorView,
  WrappedView,
} from "@/components/views";
import type { WrappedStats } from "@/types/wrapped";

// In production (same origin), use empty string; in dev, use the backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

type ViewState = "input" | "loading" | "wrapped" | "error";

export function App() {
  const [username, setUsername] = useState("");
  const [viewState, setViewState] = useState<ViewState>("input");
  const [stats, setStats] = useState<WrappedStats | null>(null);
  const [error, setError] = useState<string>("");

  const fetchWrapped = async (username: string) => {
    const response = await fetch(`${API_BASE_URL}/api/wrapped/${username}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User "${username}" not found on GitHub`);
      }
      throw new Error("Failed to fetch wrapped stats. Please try again.");
    }

    return response.json();
  };

  const handleSubmit = async (submittedUsername: string) => {
    setUsername(submittedUsername);
    setViewState("loading");
    setError("");

    try {
      const data = await fetchWrapped(submittedUsername);
      setStats(data);
      setViewState("wrapped");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setViewState("error");
    }
  };

  const handleBack = () => {
    setViewState("input");
    setStats(null);
    setError("");
  };

  if (viewState === "loading") {
    return <LoadingView username={username} />;
  }

  if (viewState === "error") {
    return <ErrorView error={error} onBack={handleBack} />;
  }

  if (viewState === "wrapped" && stats) {
    return <WrappedView stats={stats} onBack={handleBack} />;
  }

  return <InputView onSubmit={handleSubmit} />;
}

export default App;
