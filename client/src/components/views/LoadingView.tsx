import { Loader2 } from "lucide-react";

interface LoadingViewProps {
  username: string;
}

export function LoadingView({ username }: LoadingViewProps) {
  return (
    <div className="animated-bg min-h-screen flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6">
        <Loader2 className="size-16 text-primary animate-spin" />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Generating Your Wrapped
          </h2>
          <p className="text-white/60">
            Analyzing @{username}'s GitHub activity...
          </p>
        </div>
      </div>
    </div>
  );
}
