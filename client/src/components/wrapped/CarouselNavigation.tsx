import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselNavigationProps {
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

export function CarouselNavigation({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  canScrollPrev,
  canScrollNext,
}: CarouselNavigationProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto px-4">
      {/* Previous Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrev}
        disabled={!canScrollPrev}
        className="size-12 rounded-full bg-card/50 border border-border/50 text-foreground hover:bg-card hover:text-primary disabled:opacity-30"
      >
        <ChevronLeft className="size-6" />
      </Button>

      {/* Progress Dots */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-6 bg-primary"
                : "w-2 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={!canScrollNext}
        className="size-12 rounded-full bg-card/50 border border-border/50 text-foreground hover:bg-card hover:text-primary disabled:opacity-30"
      >
        <ChevronRight className="size-6" />
      </Button>
    </div>
  );
}
