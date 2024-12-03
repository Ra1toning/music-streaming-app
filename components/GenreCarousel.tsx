import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TrendingItem from "@/components/TrendingItem";

interface TrendingItemType {
  title: string;
  imageSrc: string;
  albumLink: string;
}

interface GenreCarouselProps {
  genre: string;
  trendingItems: TrendingItemType[];
}

const GenreCarousel: React.FC<GenreCarouselProps> = ({ genre, trendingItems }) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-white text-2xl font-semibold">{genre}</h1>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="flex gap-4 md:gap-6 lg:gap-8">
          {trendingItems.map((item, index) => (
            <CarouselItem key={index} className="sm:basis-auto lg:basis-auto">
              <TrendingItem
                title={item.title}
                imageSrc={item.imageSrc}
                albumLink={item.albumLink}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -top-10 right-10 flex space-x-0">
          <CarouselPrevious className="rounded-full p-2 bg-white/10 text-white hover:bg-white/20 transition" />
          <CarouselNext className="rounded-full p-2 bg-white/10 text-white hover:bg-white/20 transition" />
        </div>
      </Carousel>
    </div>
  );
};

export default GenreCarousel;
