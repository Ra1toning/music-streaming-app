'use client'

import React from 'react';
import { Artist, Song } from "@/types";
import SongItem from './SongItem';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import useOnPlay from '@/hooks/useOnPlay';

interface SongContentProps {
  songs: Song[];
  artists: Artist[];
  title?: string;
};

const SongContent: React.FC<SongContentProps> = ({
  songs,
  artists,
  title = "Songs"
}) => {

  const { onPlay } = useOnPlay(songs);

  if (songs?.length === 0) {
    return (
      <div className="mt-4 text-neutral-400 w-full flex items-center justify-center">
        No songs found
      </div>
    );
  }

  return (
    <div className="mt-8 mx-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-white text-2xl font-semibold">{title}</h1>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 2,
        }}
        className="w-full relative"
      >
        <CarouselContent className="flex gap-4 md:gap-6 lg:gap-8">
          {songs.map((song) => (
            <CarouselItem
              key={song.id}
              className="sm:basis-auto lg:basis-auto"
            >
              <SongItem
                data={song}
                artist={artists.find((artist) => artist.id === song.artist_id)}
                onClick={(id) => onPlay(id)}
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

export default SongContent;
