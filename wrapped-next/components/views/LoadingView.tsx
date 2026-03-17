import { Loader2 } from "lucide-react";

interface LoadingViewProps {
  username: string;
}

export function LoadingView({ username }: LoadingViewProps) {
  return (
    <div className="animated-bg subtle-grid relative min-h-screen px-4 py-6 sm:px-6 sm:py-8">
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="surface-card w-full max-w-lg p-7 text-center sm:p-9">
          <Loader2 className="mx-auto mb-6 size-14 animate-spin text-primary" />
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
            Generating Your Wrapped
          </h2>
          <p className="text-muted-foreground">
            Analyzing @{username}&apos;s GitHub activity...
          </p>
          <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-muted/60">
            <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-chart-1 via-accent to-chart-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
