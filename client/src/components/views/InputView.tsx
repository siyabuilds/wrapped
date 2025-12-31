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
    <div className="animated-bg min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-center">
        <span className="text-white">GitHub </span>
        <span className="gradient-text">Wrapped</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-full max-w-md"
      >
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={handleUsernameChange}
            className={`flex-1 h-14 text-lg bg-white/10 border-white/30 text-white placeholder:text-white/60 ${
              validationError
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
          />
          <Button type="submit" size="lg" className="gap-2 h-14 text-lg px-6">
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
      </form>

      <p className="text-white/40 text-sm mt-6 text-center max-w-md">
        Enter your GitHub username to see your year in review — commits,
        contributions, and more!
      </p>
    </div>
  );
}
