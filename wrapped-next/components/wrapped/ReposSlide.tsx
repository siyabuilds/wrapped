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
      <Card className="bg-card/90 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden">
        <CardContent className="pt-10 pb-8 flex flex-col items-center gap-6">
          {/* Icon */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-chart-5 to-primary rounded-full blur-lg opacity-60" />
            <div className="relative size-20 bg-card rounded-full flex items-center justify-center ring-4 ring-chart-5/30">
              <FolderGit2 className="size-10 text-chart-5" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-muted-foreground uppercase tracking-wider text-sm">
              Total Repositories
            </p>
            <h2 className="text-6xl font-bold text-foreground gradient-text">
              {stats.totalRepos}
            </h2>
          </div>

          {/* Stats */}
          <div className="w-full grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col items-center p-4 rounded-xl bg-muted/30 border border-border/30">
              <Users className="size-5 text-chart-1 mb-2" />
              <span className="text-2xl font-bold text-foreground">
                {stats.followers.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">Followers</span>
            </div>

            <div className="flex flex-col items-center p-4 rounded-xl bg-muted/30 border border-border/30">
              <Users className="size-5 text-chart-2 mb-2" />
              <span className="text-2xl font-bold text-foreground">
                {stats.following.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">Following</span>
            </div>
          </div>

          {/* Top Starred Repo */}
          {stats.topStarredRepo && stats.topStarredRepo.stars! > 0 && (
            <div className="w-full p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mt-2">
              <div className="flex items-center gap-3">
                <Star className="size-6 text-yellow-500 fill-yellow-500 shrink-0" />
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
                  className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
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
