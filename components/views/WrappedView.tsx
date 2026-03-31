import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WrappedCarousel } from "@/components/wrapped";
import type { WrappedStats } from "@/types/wrapped";

interface WrappedViewProps {
  stats: WrappedStats;
  onBack: () => void;
}

export function WrappedView({ stats, onBack }: WrappedViewProps) {
  return (
    <div className="animated-bg min-h-screen flex flex-col items-center px-4 py-8 sm:py-10 animate-in fade-in zoom-in-95 duration-700 ease-out fill-mode-both">
      {/* Back Button */}
      <Button
        onClick={onBack}
        variant="ghost"
        className="absolute top-4 left-4 text-muted-foreground hover:text-foreground hover:bg-card/60 gap-2 z-10"
      >
        <ArrowLeft className="size-4" />
        Back
      </Button>

      {/* Header */}
      <div className="text-center mt-12 sm:mt-0 mb-6 space-y-3">
        <p className="soft-tag mx-auto">@{stats.username}</p>
        <h1 className="text-3xl sm:text-4xl font-bold">
          <span className="text-foreground">GitHub </span>
          <span className="gradient-text">Wrapped</span>
        </h1>
      </div>

      {/* Carousel */}
      <div className="flex-1 flex items-center justify-center w-full">
        <WrappedCarousel stats={stats} />
      </div>
    </div>
  );
}
