import { Calendar, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { WrappedStats } from "@/types/wrapped";
import { SlideWrapper } from "./SlideWrapper";

interface IntroSlideProps {
  stats: WrappedStats;
}

export function IntroSlide({ stats }: IntroSlideProps) {
  return (
    <SlideWrapper>
      <Card className="h-full border-border/80 bg-card/95 shadow-[0_16px_60px_-35px_rgba(25,40,76,0.45)]">
        <CardContent className="flex h-full flex-col items-center gap-6 pt-8 pb-8 sm:pt-10">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-chart-1 via-accent to-chart-3 blur-md opacity-65" />
            <img
              src={stats.avatarUrl}
              alt={`${stats.username}'s avatar`}
              className="relative size-28 rounded-full ring-4 ring-card shadow-xl sm:size-32"
            />
          </div>

          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {stats.name || stats.username}
            </h2>
            <p className="flex items-center justify-center gap-2 text-base text-muted-foreground sm:text-lg">
              <User className="size-4" />@{stats.username}
            </p>
          </div>

          <Badge
            variant="outline"
            className="gap-2 border-primary/30 bg-background/90 px-4 py-2 text-sm text-primary sm:text-base"
          >
            <Calendar className="size-4" />
            {stats.year} Wrapped
          </Badge>

          <div className="mt-2 text-center">
            <p className="text-xl font-semibold text-foreground sm:text-2xl">
              A snapshot of your engineering year
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Swipe to explore your GitHub journey
            </p>
          </div>

          {stats.bio && (
            <p className="mt-2 line-clamp-2 border-t border-border/70 pt-4 px-4 text-center text-sm italic text-muted-foreground sm:px-6">
              "{stats.bio}"
            </p>
          )}
        </CardContent>
      </Card>
    </SlideWrapper>
  );
}
