"use client";

import React, { useState, useEffect } from "react";
import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "Trusted by these companies",
  logos = [],
}: Logos3Props) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    const autoScroll = api.plugins().autoScroll;
    if (!autoScroll) return;

    const rootNode = api.rootNode();

    const handleMouseEnter = () => {
      autoScroll.stop();
    };

    const handleMouseLeave = () => {
      // Small timeout to ensure smooth resume post-interaction/drag
      setTimeout(() => {
        if (autoScroll.isPlaying() === false) {
          autoScroll.play();
        }
      }, 50);
    };

    rootNode.addEventListener("mouseenter", handleMouseEnter);
    rootNode.addEventListener("mouseleave", handleMouseLeave);
    
    // Also pause on pointer/drag start and resume on end
    api.on("pointerDown", () => autoScroll.stop());
    api.on("pointerUp", () => {
      setTimeout(() => {
        autoScroll.play();
      }, 300); // slight delay after release to let drag free physics settle
    });

    return () => {
      rootNode.removeEventListener("mouseenter", handleMouseEnter);
      rootNode.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [api]);

  return (
    <div className="py-0">
      <div className="container flex flex-col items-center text-center">
        {heading && (
          <h1 className="my-6 text-2xl font-bold text-pretty lg:text-4xl">
            {heading}
          </h1>
        )}
      </div>
      <div className="pt-2 md:pt-4 lg:pt-8">
        <div className="relative mx-auto flex w-full max-w-full items-center justify-center lg:max-w-5xl">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              loop: true,
              dragFree: true, // Enables smooth high-speed swiping and custom physics
            }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                speed: 1,
                stopOnInteraction: false,
                stopOnMouseEnter: true, // Stops autoScroll on pointer hover
              })
            ]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-4 sm:mx-6 md:mx-10 flex shrink-0 items-center justify-center">
                    <div>
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className={logo.className}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export { Logos3 };