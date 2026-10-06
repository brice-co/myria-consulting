"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const AUTOPLAY_DELAY = 6000;

export function useExperienceCarousel() {
  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const [progress, setProgress] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      duration: 25,
    },
    [
      Autoplay({
        delay: AUTOPLAY_DELAY,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(
      emblaApi.selectedScrollSnap(),
    );

    setProgress(0);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    const autoplay = emblaApi.plugins().autoplay;

    if (!autoplay) return;

    let frameId = 0;

    const update = () => {
      const timeLeft =
        autoplay.timeUntilNext();

      if (timeLeft !== null) {
        const elapsed =
          AUTOPLAY_DELAY - timeLeft;

        setProgress(
          Math.min(
            100,
            Math.max(
              0,
              (elapsed / AUTOPLAY_DELAY) * 100,
            ),
          ),
        );
      }

      frameId =
        requestAnimationFrame(update);
    };

    frameId =
      requestAnimationFrame(update);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);

      cancelAnimationFrame(frameId);
    };
  }, [emblaApi, onSelect]);

  const select = useCallback(
    (index: number) => {
      if (!emblaApi) return;

      emblaApi.scrollTo(index);

      const autoplay =
        emblaApi.plugins().autoplay;

      autoplay?.reset();
    },
    [emblaApi],
  );

  return {
    emblaRef,
    selectedIndex,
    progress,
    select,
  };
}