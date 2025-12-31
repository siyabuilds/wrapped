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
        backgroundColor: "#1a1a2e",
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
        backgroundColor: "#1a1a2e",
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
        {/* Downloadable Summary Card */}
        <div
          ref={summaryRef}
          className="p-6 rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          }}
        >
          <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl">
            <CardContent className="pt-6 pb-6">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
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
                <Badge className="ml-auto bg-primary/20 text-primary border-primary/30">
                  {stats.year} Wrapped
                </Badge>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
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

              {/* Language & Day */}
              <div className="flex gap-3 mb-6">
                <div className="flex-1 p-3 rounded-lg bg-muted/30 border border-border/30">
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
                <div className="flex-1 p-3 rounded-lg bg-muted/30 border border-border/30">
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

              {/* Top Repo */}
              {stats.topStarredRepo && stats.topStarredRepo.stars! > 0 && (
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-muted-foreground">
                      Top Repo:
                    </span>
                    <span className="font-medium text-foreground truncate flex-1">
                      {stats.topStarredRepo.name}
                    </span>
                    <span className="text-yellow-500 text-sm">
                      {stats.topStarredRepo.stars} ★
                    </span>
                  </div>
                </div>
              )}

              {/* Dev Story */}
              {devStory && (
                <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-chart-2/10 border border-primary/20">
                  <p className="text-foreground text-sm italic text-center leading-relaxed">
                    "{devStory}"
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  🚀 Generated with GitHub Wrapped
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button onClick={handleDownload} className="gap-2" size="lg">
            <Download className="size-4" />
            Download
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="gap-2"
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
    <div className="flex flex-col items-center p-3 rounded-lg bg-muted/30 border border-border/30">
      {icon}
      <span className="text-lg font-bold text-foreground mt-1">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
