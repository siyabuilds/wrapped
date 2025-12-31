import {
  Calendar,
  Code2,
  GitCommit,
  Flame,
  Users,
  Star,
  Activity,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { WrappedStats } from "@/types/wrapped";

interface WrappedLandingProps {
  stats: WrappedStats;
}

export function WrappedLanding({ stats }: WrappedLandingProps) {
  const accountYear = stats.createdAt
    ? new Date(stats.createdAt).getFullYear()
    : null;

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="bg-card/80 backdrop-blur-xl border-white/10 shadow-2xl">
        <CardContent className="pt-8 pb-6 flex flex-col items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-chart-2 to-chart-3 rounded-full blur-md opacity-75 animate-pulse" />
            <img
              src={stats.avatarUrl}
              alt={`${stats.username}'s avatar`}
              className="relative size-28 rounded-full ring-4 ring-background shadow-xl"
            />
          </div>

          {/* Name & Username */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-foreground">
              {stats.name || stats.username}
            </h2>
            <p className="text-muted-foreground text-base">@{stats.username}</p>
          </div>

          {/* Year Badge */}
          <Badge variant="outline" className="text-sm px-3 py-1 gap-1.5">
            <Calendar className="size-3.5" />
            {stats.year} Wrapped
          </Badge>

          {/* Stats Grid */}
          <div className="w-full grid grid-cols-2 gap-3">
            {/* Followers */}
            <StatCard
              icon={<Users className="size-4 text-chart-1" />}
              label="Followers"
              value={stats.followers.toLocaleString()}
            />

            {/* Account Year */}
            {accountYear && (
              <StatCard
                icon={<Calendar className="size-4 text-chart-2" />}
                label="Member Since"
                value={accountYear.toString()}
              />
            )}

            {/* Top Language */}
            <StatCard
              icon={<Code2 className="size-4 text-chart-3" />}
              label="Top Language"
              value={stats.topLanguage}
            />

            {/* Total Commits */}
            <StatCard
              icon={<GitCommit className="size-4 text-chart-4" />}
              label="Commits"
              value={stats.totalCommits.toLocaleString()}
            />

            {/* Active Days */}
            <StatCard
              icon={<Flame className="size-4 text-chart-5" />}
              label="Active Days"
              value={stats.activeDays.toLocaleString()}
            />

            {/* Total Contributions */}
            <StatCard
              icon={<Activity className="size-4 text-primary" />}
              label="Contributions"
              value={stats.totalContributions.toLocaleString()}
            />
          </div>

          {/* Top Starred Repo (if exists) */}
          {stats.topStarredRepo && stats.topStarredRepo.stars! > 0 && (
            <div className="w-full mt-2 p-3 rounded-xl bg-muted/50 border border-border/50">
              <div className="flex items-center gap-2 text-sm">
                <Star className="size-4 text-yellow-500 fill-yellow-500" />
                <span className="text-muted-foreground">Top Repo:</span>
                <span className="font-medium text-foreground truncate">
                  {stats.topStarredRepo.name}
                </span>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {stats.topStarredRepo.stars} ★
                </Badge>
              </div>
            </div>
          )}

          {/* Bio (if exists) */}
          {stats.bio && (
            <p className="text-sm text-muted-foreground text-center italic px-4 line-clamp-2">
              "{stats.bio}"
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-muted/30 border border-border/30 transition-colors hover:bg-muted/50">
      {icon}
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}

export default WrappedLanding;
