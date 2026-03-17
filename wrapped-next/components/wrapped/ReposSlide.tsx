import { FolderGit2, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { WrappedStats } from "@/types/wrapped";
import { SlideWrapper } from "./SlideWrapper";

interface ReposSlideProps {
  stats: WrappedStats;
}

export function ReposSlide({ stats }: ReposSlideProps) {
  return (
    <SlideWrapper>
      <Card className="h-full border-border/80 bg-card/95 shadow-[0_16px_60px_-35px_rgba(25,40,76,0.45)]">
        <CardContent className="flex h-full flex-col items-center gap-6 pt-8 pb-8 sm:pt-10">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-chart-5 to-primary blur-md opacity-60" />
            <div className="relative flex size-20 items-center justify-center rounded-full bg-card ring-4 ring-chart-5/25">
              <FolderGit2 className="size-10 text-chart-5" />
            </div>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-sm uppercase tracking-[0.17em] text-muted-foreground">
              Total Repositories
            </p>
            <h2 className="gradient-text text-5xl font-bold sm:text-6xl">
              {stats.totalRepos}
            </h2>
          </div>

          <div className="mt-2 grid w-full grid-cols-2 gap-3 sm:gap-4">
            <div className="glass-panel flex flex-col items-center p-4">
              <Users className="mb-2 size-5 text-chart-1" />
              <span className="text-2xl font-bold text-foreground">
                {stats.followers.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">Followers</span>
            </div>

            <div className="glass-panel flex flex-col items-center p-4">
              <Users className="mb-2 size-5 text-chart-2" />
              <span className="text-2xl font-bold text-foreground">
                {stats.following.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">Following</span>
            </div>
          </div>

          {stats.topStarredRepo && stats.topStarredRepo.stars! > 0 && (
            <div className="mt-1 w-full rounded-2xl border border-chart-2/35 bg-chart-2/10 p-4">
              <div className="flex items-center gap-3">
                <Star className="size-6 shrink-0 fill-chart-2 text-chart-2" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">
                    Top Starred Repo
                  </p>
                  <p className="font-semibold text-foreground truncate">
                    {stats.topStarredRepo.name}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="border-chart-2/35 bg-chart-2/20 text-chart-2"
                >
                  {stats.topStarredRepo.stars} ★
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </SlideWrapper>
  );
}
