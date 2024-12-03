import React from "react";
import GenreCarousel from "@/components/GenreCarousel";

const trendingItems = {
  pop: [
    {
      title: "Weeknd: Dawn FM",
      imageSrc: "/images/album/weeknd.jpg",
      albumLink: "/albums/weeknd-dawn-fm",
    },
    {
      title: "Gorillaz: The Tired Influence",
      imageSrc: "/images/album/gorillaz.jpg",
      albumLink: "/albums/gorillaz-tired-influence",
    },
  ],
  rock: [
    {
      title: "Asian Kung-Fu Generations",
      imageSrc: "/images/album/akg.jpg",
      albumLink: "/albums/akg",
    },
    {
      title: "Home Made Kazoku",
      imageSrc: "/images/album/hmk.jpg",
      albumLink: "/albums/hmk",
    },
  ],
  jazz: [
    {
      title: "Miles Davis: Kind of Blue",
      imageSrc: "/images/album/miles.jpg",
      albumLink: "/albums/miles-kind-of-blue",
    },
    {
      title: "John Coltrane: A Love Supreme",
      imageSrc: "/images/album/coltrane.jpg",
      albumLink: "/albums/coltrane-a-love-supreme",
    },
  ],
};

export default function Home() {
  return (
    <div className="bg-neutral-900 h-full w-full overflow-auto">
      {/* Top Banner Section */}
      <div
        className="relative w-full h-3/6 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/banner1.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="px-6 mt-6">
        {/* Render Carousel by Genre */}
        {trendingItems.pop.length > 0 && (
          <GenreCarousel genre="Trending now" trendingItems={trendingItems.pop} />
        )}
        {trendingItems.rock.length > 0 && (
          <GenreCarousel genre="Rock" trendingItems={trendingItems.rock} />
        )}
      </div>
    </div>
  );
}
