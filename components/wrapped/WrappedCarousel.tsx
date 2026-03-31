import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { WrappedStats, Predictions } from "@/types/wrapped";

import { IntroSlide } from "./IntroSlide";
import { CommitsSlide } from "./CommitsSlide";
import { LanguagesSlide } from "./LanguagesSlide";
import { ActivitySlide } from "./ActivitySlide";
import { ReposSlide } from "./ReposSlide";
import { GhostedSlide } from "./GhostedSlide";
import { RoastSlide } from "./RoastSlide";
import { PredictionsSlide } from "./PredictionsSlide";
import { AdviceSlide } from "./AdviceSlide";
import { DevStorySlide } from "./DevStorySlide";
import { SummarySlide } from "./SummarySlide";
import { CarouselNavigation } from "./CarouselNavigation";

interface WrappedCarouselProps {
  stats: WrappedStats;
}

// In production (same origin), use empty string; in dev, set NEXT_PUBLIC_API_URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export function WrappedCarousel({ stats }: WrappedCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  // AI Content State
  const [roast, setRoast] = useState<string | null>(stats.roast || null);
  const [predictions, setPredictions] = useState<Predictions | null>(
    stats.predictions || null
  );
  const [advice, setAdvice] = useState<string | null>(stats.advice || null);
  const [devStory, setDevStory] = useState<string | null>(
    stats.devStory || null
  );
  const [aiLoading, setAiLoading] = useState(false);
  const [aiFetched, setAiFetched] = useState(false);

  const totalSlides = 11;

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const syncViewportHeight = useCallback(() => {
    if (!emblaApi) return;
    const selectedIndex = emblaApi.selectedScrollSnap();
    const selectedSlide = emblaApi.slideNodes()[selectedIndex] as
      | HTMLElement
      | undefined;
    if (!selectedSlide) return;

    const contentNode = selectedSlide.firstElementChild as HTMLElement | null;
    const slideStyles = window.getComputedStyle(selectedSlide);
    const verticalPadding =
      parseFloat(slideStyles.paddingTop) + parseFloat(slideStyles.paddingBottom);

    const nextHeight =
      (contentNode?.offsetHeight ?? selectedSlide.offsetHeight) + verticalPadding;
    if (nextHeight > 0) {
      setViewportHeight(nextHeight);
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    syncViewportHeight();
  }, [emblaApi, syncViewportHeight]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Fetch AI content when reaching AI slides
  useEffect(() => {
    const aiSlideStart = 6; // RoastSlide index

    if (currentIndex >= aiSlideStart && !aiFetched && !aiLoading) {
      fetchAIContent();
    }
  }, [currentIndex, aiFetched, aiLoading]);

  useEffect(() => {
    syncViewportHeight();
  }, [
    currentIndex,
    roast,
    predictions,
    advice,
    devStory,
    aiLoading,
    syncViewportHeight,
  ]);

  const fetchAIContent = async () => {
    // Skip if already have all AI content from cache
    if (roast && predictions && advice && devStory) {
      setAiFetched(true);
      return;
    }

    setAiLoading(true);

    try {
      // Fetch roast
      if (!roast) {
        const roastResponse = await fetch(
          `${API_BASE_URL}/api/wrapped/${stats.username}/roast`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stats }),
          }
        );
        if (roastResponse.ok) {
          const data = await roastResponse.json();
          setRoast(data.roast);
        }
      }

      // Fetch other AI insights
      if (!predictions || !advice || !devStory) {
        const insightsResponse = await fetch(
          `${API_BASE_URL}/api/wrapped/${stats.username}/ai-insights`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stats }),
          }
        );
        if (insightsResponse.ok) {
          const data = await insightsResponse.json();
          setPredictions(data.predictions);
          setAdvice(data.advice);
          setDevStory(data.devStory);
        }
      }
    } catch (error) {
      console.error("Failed to fetch AI content:", error);
    } finally {
      setAiLoading(false);
      setAiFetched(true);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollPrev, scrollNext]);

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Carousel Container */}
      <div
        className="overflow-hidden transition-[height] duration-300 ease-out"
        ref={emblaRef}
        style={viewportHeight ? { height: `${viewportHeight}px` } : undefined}
      >
        <div className="flex items-start">
          <IntroSlide stats={stats} />
          <CommitsSlide stats={stats} />
          <LanguagesSlide stats={stats} />
          <ActivitySlide stats={stats} />
          <ReposSlide stats={stats} />
          <GhostedSlide stats={stats} />
          <RoastSlide roast={roast} isLoading={aiLoading && !roast} />
          <PredictionsSlide
            predictions={predictions}
            isLoading={aiLoading && !predictions}
            nextYear={stats.year + 1}
          />
          <AdviceSlide advice={advice} isLoading={aiLoading && !advice} />
          <DevStorySlide
            devStory={devStory}
            isLoading={aiLoading && !devStory}
            year={stats.year}
          />
          <SummarySlide stats={stats} devStory={devStory} />
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6">
        <CarouselNavigation
          currentIndex={currentIndex}
          totalSlides={totalSlides}
          onPrev={scrollPrev}
          onNext={scrollNext}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
        />
      </div>

      {/* Slide Counter */}
      <p className="text-center text-muted-foreground text-xs sm:text-sm mt-4 tracking-[0.2em] uppercase">
        {currentIndex + 1} / {totalSlides}
      </p>
    </div>
  );
}
