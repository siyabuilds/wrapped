import { useState } from "react";
import { Headphones, AlertCircle } from "lucide-react";
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
    <div className="animated-bg min-h-screen flex items-center justify-center px-4 py-8">
      <section className="hero-shell w-full max-w-4xl p-6 sm:p-10 lg:p-12">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-5 text-center lg:text-left">
            <p className="soft-tag mx-auto lg:mx-0">Annual Dev Story</p>
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold leading-[0.95]">
              <span className="text-foreground">GitHub </span>
              <span className="gradient-text">Wrapped</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              Turn your year of commits, repos, and coding habits into a shareable story deck.
            </p>
          </div>

          <div className="glass-panel p-4 sm:p-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
              <label htmlFor="github-username" className="soft-tag w-fit">
                GitHub Username
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  id="github-username"
                  type="text"
                  placeholder="octocat"
                  value={username}
                  onChange={handleUsernameChange}
                  className={`flex-1 h-14 text-lg border-border/90 bg-card/65 text-foreground placeholder:text-muted-foreground ${
                    validationError ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                />
                <Button type="submit" size="lg" className="gap-2 h-14 text-lg px-7">
                  <Headphones className="size-6" />
                  Get Wrapped
                </Button>
              </div>

              {validationError && (
                <p className="text-destructive text-sm flex items-center gap-1.5">
                  <AlertCircle className="size-4 shrink-0" />
                  {validationError}
                </p>
              )}

              <p className="text-muted-foreground text-sm pt-2">
                We only analyze public data and generate your wrapped in a few seconds.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
