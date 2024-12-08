
import GenreCarousel from "@/components/GenreCarousel";
import getArtists from "@/actions/getArtists";
import getAlbums from "@/actions/getAlbums";
import { groupAlbumsByGenre } from "@/utils/dataUtils";

export default async function Home() {
  const albums = await getAlbums();
  const artists = await getArtists();

  const albumCards = groupAlbumsByGenre(albums);

  return (
    <div className="bg-neutral-900 h-full w-full rounded-lg overflow-auto">
      {/* Top Banner Section */}
      <div
        className="relative w-full h-3/6 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/banner1.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="px-6 mt-6">
        {Object.keys(albumCards).map((genre) => (
          <GenreCarousel
            key={genre}
            genre={genre}
            albumCards={albumCards[genre]}
          />
        ))}
      </div>
    </div>
  );
}
