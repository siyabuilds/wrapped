import { useRef } from "react";
import { toPng } from "html-to-image";
import {
  Download,
  Share2,
  Code2,
  GitCommit,
  Flame,
  FolderGit2,
  Calendar,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { WrappedStats } from "@/types/wrapped";
import { SlideWrapper } from "./SlideWrapper";

interface SummarySlideProps {
  stats: WrappedStats;
  devStory: string | null;
}

export function SummarySlide({ stats, devStory }: SummarySlideProps) {
  const summaryRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!summaryRef.current) return;

    try {
      const dataUrl = await toPng(summaryRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#f6f3ee",
      });

      const link = document.createElement("a");
      link.download = `github-wrapped-${stats.username}-${stats.year}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to generate image:", error);
    }
  };

  const handleShare = async () => {
    if (!summaryRef.current) return;

    try {
      const dataUrl = await toPng(summaryRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#f6f3ee",
      });

      // Convert base64 to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File(
        [blob],
        `github-wrapped-${stats.username}-${stats.year}.png`,
        {
          type: "image/png",
        }
      );

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `GitHub Wrapped ${stats.year}`,
          text: `Check out my GitHub Wrapped ${stats.year}! 🚀`,
        });
      } else {
        // Fallback to download
        handleDownload();
      }
    } catch (error) {
      console.error("Failed to share:", error);
      handleDownload();
    }
  };

  return (
    <SlideWrapper>
      <div className="space-y-4">
        <Card
          ref={summaryRef}
          className="border-border/80 bg-card/96 shadow-[0_18px_60px_-34px_rgba(25,40,76,0.45)]"
        >
          <CardContent className="pt-6 pb-6">
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <img
                  src={stats.avatarUrl}
                  alt={stats.username}
                  className="size-16 rounded-full ring-2 ring-primary/50"
                />
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {stats.name || stats.username}
                  </h2>
                  <p className="text-muted-foreground">@{stats.username}</p>
                </div>
                <Badge className="ml-auto border-primary/30 bg-primary/15 text-primary">
                  {stats.year} Wrapped
                </Badge>
              </div>

              <div className="mb-6 grid grid-cols-3 gap-2 sm:gap-3">
                <StatBox
                  icon={<GitCommit className="size-4 text-chart-4" />}
                  value={stats.totalCommits.toLocaleString()}
                  label="Commits"
                />
                <StatBox
                  icon={<Flame className="size-4 text-orange-500" />}
                  value={stats.activeDays.toString()}
                  label="Active Days"
                />
                <StatBox
                  icon={<FolderGit2 className="size-4 text-chart-5" />}
                  value={stats.totalRepos.toString()}
                  label="Repos"
                />
              </div>

              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border/70 bg-muted/40 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Code2 className="size-4 text-chart-3" />
                    <span className="text-xs text-muted-foreground">
                      Top Language
                    </span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {stats.topLanguage}
                  </span>
                </div>
                <div className="rounded-lg border border-border/70 bg-muted/40 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="size-4 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      Most Active
                    </span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {stats.mostActiveDay}
                  </span>
                </div>
              </div>

              {stats.topStarredRepo && stats.topStarredRepo.stars! > 0 && (
                <div className="mb-6 rounded-lg border border-chart-2/35 bg-chart-2/10 p-3">
                  <div className="flex items-center gap-2">
                    <Star className="size-4 fill-chart-2 text-chart-2" />
                    <span className="text-sm text-muted-foreground">
                      Top Repo:
                    </span>
                    <span className="font-medium text-foreground truncate flex-1">
                      {stats.topStarredRepo.name}
                    </span>
                    <span className="text-sm text-chart-2">
                      {stats.topStarredRepo.stars} ★
                    </span>
                  </div>
                </div>
              )}

              {devStory && (
                <div className="rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 to-chart-2/10 p-4">
                  <p className="text-foreground text-sm italic text-center leading-relaxed">
                    "{devStory}"
                  </p>
                </div>
              )}

              <div className="mt-6 flex items-center justify-center border-t border-border/50 pt-4">
                <span className="text-xs text-muted-foreground">
                  Generated with GitHub Wrapped
                </span>
              </div>
          </CardContent>
        </Card>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={handleDownload} className="gap-2 rounded-2xl" size="lg">
            <Download className="size-4" />
            Download
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="gap-2 rounded-2xl border-border bg-card/90"
            size="lg"
          >
            <Share2 className="size-4" />
            Share
          </Button>
        </div>
      </div>
    </SlideWrapper>
  );
}

interface StatBoxProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function StatBox({ icon, value, label }: StatBoxProps) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-border/70 bg-muted/40 p-3">
      {icon}
      <span className="text-lg font-bold text-foreground mt-1">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
