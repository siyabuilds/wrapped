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
        <Card className="bg-card/90 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden">
          <CardContent className="pt-10 pb-8 flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-chart-1 to-chart-2 rounded-full blur-lg opacity-60" />
              <div className="relative size-20 bg-card rounded-full flex items-center justify-center ring-4 ring-chart-1/30">
                <Ghost className="size-10 text-chart-1" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">
                No Ghosted Repos! 👻
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
      <Card className="bg-card/90 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden">
        <CardContent className="pt-10 pb-8 flex flex-col items-center gap-6">
          {/* Icon */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-muted-foreground/50 to-muted-foreground/30 rounded-full blur-lg opacity-60" />
            <div className="relative size-20 bg-card rounded-full flex items-center justify-center ring-4 ring-muted-foreground/30">
              <Ghost className="size-10 text-muted-foreground" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-muted-foreground uppercase tracking-wider text-sm">
              Most Ghosted Repo 👻
            </p>
            <h2 className="text-3xl font-bold text-foreground break-all">
              {stats.ghostedRepo.name}
            </h2>
          </div>

          {/* Days Count */}
          <div className="text-center">
            <p className="text-6xl font-bold gradient-text">
              {stats.ghostedRepo.ghostDays}
            </p>
            <p className="text-muted-foreground mt-1">days without a commit</p>
          </div>

          {/* Message */}
          <div className="px-4 py-3 rounded-xl bg-muted/30 border border-border/30 text-center">
            <p className="text-sm text-muted-foreground">
              Don't worry, we all have that one project we promised to finish
              "someday" 😅
            </p>
          </div>

          {/* View Repo Button */}
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
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
