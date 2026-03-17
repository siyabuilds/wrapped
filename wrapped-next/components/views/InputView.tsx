import { useState } from "react";
import {
  Headphones,
  AlertCircle,
  Sparkles,
  Flame,
  Code2,
  Orbit,
  Radar,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// GitHub username validation regex
const GITHUB_USERNAME_REGEX = /^(?!-)(?!.*--)[a-zA-Z0-9-]{1,39}(?<!-)$/;

interface InputViewProps {
  onSubmit: (username: string) => void;
}

export function InputView({ onSubmit }: InputViewProps) {
  const [username, setUsername] = useState("");
  const [validationError, setValidationError] = useState<string>("");

  const validateUsername = (value: string): boolean => {
    if (!value.trim()) {
      setValidationError("Please enter a username");
      return false;
    }
    if (!GITHUB_USERNAME_REGEX.test(value.trim())) {
      setValidationError(
        "Invalid GitHub username. Use 1-39 alphanumeric characters or hyphens (no consecutive or leading/trailing hyphens)"
      );
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    if (validationError) {
      setValidationError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    if (validateUsername(trimmedUsername)) {
      onSubmit(trimmedUsername);
    }
  };

  return (
    <div className="animated-bg subtle-grid relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 sm:py-8">
      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-3rem)] w-full max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="surface-card flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div className="space-y-7 text-center lg:text-left">
            <p className="soft-tag text-primary">
            <Sparkles className="size-4" />
              2026 edition
            </p>

            <div className="space-y-3">
              <h1 className="text-5xl font-bold leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
                <span className="text-foreground">GitHub </span>
                <span className="gradient-text">Wrapped</span>
              </h1>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg lg:mx-0">
                Your activity report, redesigned as a visual story with momentum,
                language shifts, and AI insights in one clear flow.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <ValueCard
                icon={<Flame className="size-4 text-chart-1" />}
                title="Momentum"
                text="Heatmap peaks, consistency arcs, and your busiest windows."
              />
              <ValueCard
                icon={<Code2 className="size-4 text-chart-3" />}
                title="Stack Mix"
                text="Language balance with weighted contribution and trend feel."
              />
              <ValueCard
                icon={<Orbit className="size-4 text-chart-4" />}
                title="Narrative"
                text="Roast, practical advice, and next-year trajectory."
              />
            </div>
          </div>

          <div className="glass-panel flex items-center gap-3 p-4">
            <div className="flex size-11 items-center justify-center rounded-xl bg-accent/25 text-accent-foreground">
              <Radar className="size-5" />
            </div>
            <p className="text-sm text-muted-foreground">
              Public profile stats only. This app does not modify repositories.
            </p>
          </div>
        </section>

        <section className="surface-card flex flex-col justify-center p-5 sm:p-8 lg:p-10">
          <p className="soft-tag mb-5 w-fit">Start session</p>

          <h2 className="mb-3 text-3xl font-semibold tracking-tight text-foreground">
            Enter your GitHub username
          </h2>
          <p className="mb-6 text-muted-foreground">
            We will generate your wrapped instantly from public activity.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Enter GitHub username"
              value={username}
              onChange={handleUsernameChange}
              className={`h-14 rounded-2xl border-border bg-background text-base text-foreground placeholder:text-muted-foreground ${
                validationError
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }`}
            />

            <Button type="submit" size="lg" className="h-12 gap-2 rounded-2xl text-base shadow-sm">
              <Headphones className="size-5" />
              Generate wrapped
            </Button>

            {validationError && (
              <p className="text-destructive text-sm flex items-center gap-1.5">
                <AlertCircle className="size-4 shrink-0" />
                {validationError}
              </p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

function ValueCard({ icon, title, text }: ValueCardProps) {
  return (
    <div className="glass-panel p-4 text-left">
      <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {icon}
        {title}
      </p>
      <p className="text-sm text-foreground">{text}</p>
    </div>
  );
}
