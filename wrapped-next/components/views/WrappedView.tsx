import { ArrowLeft, CalendarRange, Sparkles, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WrappedCarousel } from "@/components/wrapped";
import type { WrappedStats } from "@/types/wrapped";

interface WrappedViewProps {
  stats: WrappedStats;
  onBack: () => void;
}

export function WrappedView({ stats, onBack }: WrappedViewProps) {
  return (
    <div className="animated-bg subtle-grid relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 sm:py-8">
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            className="gap-2 rounded-2xl border-border bg-card/90"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>

          <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-foreground">GitHub </span>
            <span className="gradient-text">Wrapped</span>
          </h1>

          <Badge variant="outline" className="rounded-2xl border-primary/30 bg-background/80 px-3 py-1.5 text-primary">
            {stats.year} Edition
          </Badge>
        </div>

        <div className="grid items-start gap-6 xl:grid-cols-[300px_1fr]">
          <aside className="surface-card space-y-3 p-4 xl:sticky xl:top-6">
            <div className="glass-panel p-3.5">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Profile</p>
              <p className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                <UserRound className="size-4 text-primary" />
                @{stats.username}
              </p>
            </div>
            <div className="glass-panel p-3.5">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Snapshot</p>
              <p className="text-sm text-foreground inline-flex items-center gap-2">
                <CalendarRange className="size-4 text-primary" />
                {stats.activeDays} active days
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Top language: {stats.topLanguage}</p>
            </div>
            <div className="rounded-2xl border border-primary/25 bg-primary/8 p-3.5">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                <Sparkles className="size-4" />
                Swipe or use arrow keys to navigate
              </p>
            </div>
          </aside>

          <div className="flex items-center justify-center">
            <WrappedCarousel stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
}
