import { Ghost, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { WrappedStats } from "@/types/wrapped";
import { SlideWrapper } from "./SlideWrapper";

interface GhostedSlideProps {
  stats: WrappedStats;
}

export function GhostedSlide({ stats }: GhostedSlideProps) {
  if (!stats.ghostedRepo) {
    return (
      <SlideWrapper>
        <Card className="h-full border-border/80 bg-card/95 shadow-[0_16px_60px_-35px_rgba(25,40,76,0.45)]">
          <CardContent className="flex h-full flex-col items-center gap-6 pt-10 pb-8">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-chart-1 to-chart-2 blur-md opacity-60" />
              <div className="relative flex size-20 items-center justify-center rounded-full bg-card ring-4 ring-chart-1/25">
                <Ghost className="size-10 text-chart-1" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                No Ghosted Repos
              </h2>
              <p className="text-muted-foreground">
                You're keeping all your projects alive. Impressive dedication!
              </p>
            </div>
          </CardContent>
        </Card>
      </SlideWrapper>
    );
  }

  return (
    <SlideWrapper>
      <Card className="h-full border-border/80 bg-card/95 shadow-[0_16px_60px_-35px_rgba(25,40,76,0.45)]">
        <CardContent className="flex h-full flex-col items-center gap-6 pt-10 pb-8">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-muted-foreground/45 to-muted-foreground/25 blur-md opacity-60" />
            <div className="relative flex size-20 items-center justify-center rounded-full bg-card ring-4 ring-muted-foreground/25">
              <Ghost className="size-10 text-muted-foreground" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm uppercase tracking-[0.17em] text-muted-foreground">
              Most Ghosted Repo
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground break-all">
              {stats.ghostedRepo.name}
            </h2>
          </div>

          <div className="text-center">
            <p className="gradient-text text-6xl font-bold">
              {stats.ghostedRepo.ghostDays}
            </p>
            <p className="text-muted-foreground mt-1">days without a commit</p>
          </div>

          <div className="glass-panel px-4 py-3 text-center">
            <p className="text-sm text-muted-foreground">
              Every developer has one long-paused project waiting for a second launch.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-xl"
            onClick={() => window.open(stats.ghostedRepo!.url, "_blank")}
          >
            <ExternalLink className="size-4" />
            Maybe revive it?
          </Button>
        </CardContent>
      </Card>
    </SlideWrapper>
  );
}
