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
    <div className="mx-auto flex w-full items-center justify-between gap-2 px-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrev}
        disabled={!canScrollPrev}
        className="size-11 rounded-2xl border border-border bg-card/90 text-foreground hover:bg-background hover:text-primary disabled:opacity-30"
      >
        <ChevronLeft className="size-6" />
      </Button>

      <div className="flex flex-1 items-center justify-center gap-1.5 sm:gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-6 sm:w-8 bg-primary"
                : "w-1.5 sm:w-2 bg-muted-foreground/35"
            }`}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={!canScrollNext}
        className="size-11 rounded-2xl border border-border bg-card/90 text-foreground hover:bg-background hover:text-primary disabled:opacity-30"
      >
        <ChevronRight className="size-6" />
      </Button>
    </div>
  );
}
