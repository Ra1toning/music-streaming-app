// /components/GenreCarousel.tsx
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AlbumCard from "@/components/AlbumCard";
import { Albums } from "@/types";

interface GenreCarouselProps {
  genre: string;
  albumCards: Albums[];
}

const GenreCarousel: React.FC<GenreCarouselProps> = ({ genre, albumCards }) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-white text-2xl font-semibold capitalize">{genre}</h1>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="flex gap-4 md:gap-6 lg:gap-8">
          {albumCards.map((album) => (
            <CarouselItem key={album.id} className="sm:basis-auto lg:basis-auto">
              <AlbumCard album={album} />
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
