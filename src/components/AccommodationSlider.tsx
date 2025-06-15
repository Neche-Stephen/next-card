
"use client";

import * as React from "react";
import type { Accommodation } from '@/types';
import AccommodationCard from './AccommodationCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface AccommodationSliderProps {
  accommodations: Accommodation[];
}

const AccommodationSlider: React.FC<AccommodationSliderProps> = ({ accommodations }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const autoplayIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const AUTOPLAY_DELAY = 5000; // 5 seconds

  const startAutoplay = React.useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    autoplayIntervalRef.current = setInterval(() => {
      if (api) {
        if (api.canScrollNext()) {
          api.scrollNext();
        } else {
          // If loop is enabled, embla handles this. If not, scroll to first.
          api.scrollTo(0); 
        }
      }
    }, AUTOPLAY_DELAY);
  }, [api]);

  const stopAutoplay = React.useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    startAutoplay();
    api.on("pointerDown", stopAutoplay); // Stop autoplay on interaction
    api.on("select", () => { // Restart autoplay after manual navigation if desired
        // Optional: if you want autoplay to resume after manual interaction
        // stopAutoplay(); 
        // startAutoplay();
    });


    return () => {
      stopAutoplay();
      api.off("pointerDown", stopAutoplay);
      // api.off("select", ...)
    };
  }, [api, startAutoplay, stopAutoplay]);


  if (!accommodations || accommodations.length === 0) {
    return <p>No accommodations to display.</p>;
  }

  return (
    <Carousel 
      opts={{
        align: "start",
        loop: true,
      }}
      setApi={setApi}
      className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto"
    >
      <CarouselContent className="-ml-1 py-4">
        {accommodations.map((accommodation, index) => (
          <CarouselItem key={accommodation.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1 h-full">
              <AccommodationCard accommodation={accommodation} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex disabled:opacity-30 disabled:cursor-not-allowed transition-opacity hover:bg-primary/90 text-primary-foreground bg-primary" />
      <CarouselNext className="hidden sm:flex disabled:opacity-30 disabled:cursor-not-allowed transition-opacity hover:bg-primary/90 text-primary-foreground bg-primary" />
    </Carousel>
  );
};

export default AccommodationSlider;
