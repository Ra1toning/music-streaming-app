import { fetchAlbums, groupAlbumsByGenre } from "@/utils/dataUtils";
import GenreCarousel from "@/components/GenreCarousel";

export default async function Home() {
  const albums = await fetchAlbums();
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
            albumCards={albumCards[genre].map(album => ({
              title: album.title,
              imageSrc: album.imageSrc,
              albumLink: album.albumLink
            }))}
          />
        ))}
      </div>
    </div>
  );
}