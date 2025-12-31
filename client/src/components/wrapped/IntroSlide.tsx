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
      <Card className="bg-card/90 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden">
        <CardContent className="pt-10 pb-8 flex flex-col items-center gap-6">
          {/* Animated Avatar */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary via-chart-2 to-chart-3 rounded-full blur-lg opacity-75 animate-pulse" />
            <img
              src={stats.avatarUrl}
              alt={`${stats.username}'s avatar`}
              className="relative size-32 rounded-full ring-4 ring-card shadow-xl"
            />
          </div>

          {/* Name & Username */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              {stats.name || stats.username}
            </h2>
            <p className="text-muted-foreground text-lg flex items-center justify-center gap-2">
              <User className="size-4" />@{stats.username}
            </p>
          </div>

          {/* Year Badge */}
          <Badge
            variant="outline"
            className="text-base px-4 py-2 gap-2 border-primary/50 text-primary"
          >
            <Calendar className="size-4" />
            {stats.year} Wrapped
          </Badge>

          {/* Welcome Message */}
          <div className="text-center mt-4 px-4">
            <p className="text-xl text-foreground font-medium">
              Let's see what you built this year! 🚀
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              Swipe to explore your GitHub journey
            </p>
          </div>

          {/* Bio */}
          {stats.bio && (
            <p className="text-sm text-muted-foreground text-center italic px-6 line-clamp-2 border-t border-border/50 pt-4 mt-2">
              "{stats.bio}"
            </p>
          )}
        </CardContent>
      </Card>
    </SlideWrapper>
  );
}
