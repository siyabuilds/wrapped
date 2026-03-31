import { Loader2 } from "lucide-react";

interface LoadingViewProps {
  username: string;
}

export function LoadingView({ username }: LoadingViewProps) {
  return (
    <div className="animated-bg min-h-screen flex items-center justify-center px-4 py-10">
      <div className="hero-shell w-full max-w-xl p-8 sm:p-10 flex flex-col items-center gap-6 text-center">
        <div className="size-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
          <Loader2 className="size-9 text-primary animate-spin" />
        </div>
        <div>
          <p className="soft-tag mx-auto mb-3">Crunching Stats</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Generating Your Wrapped
          </h2>
          <p className="text-muted-foreground">
            Analyzing @{username}&apos;s GitHub activity...
          </p>
        </div>
      </div>
    </div>
  );
}
