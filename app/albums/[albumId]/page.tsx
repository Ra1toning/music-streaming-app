import { notFound } from "next/navigation";
import { fetchAlbums } from "@/utils/dataUtils";
import Image from "next/image";
import Link from "next/link";
import { FaPlayCircle, FaRandom, FaPlusCircle } from "react-icons/fa";

const Button = ({
  variant,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
}) => (
  <button
    className={`rounded-full px-6 py-3 flex items-center ${
      variant === "primary"
        ? "bg-green-500 text-white hover:bg-green-600"
        : "bg-neutral-700 text-white hover:bg-neutral-600"
    }`}
    {...props}
  >
    {children}
  </button>
);

export default async function AlbumPage({
  params,
}: {
  params: { albumId: string };
}) {
  const { albumId } = params;
  const albums = await fetchAlbums();
  const album = albums.find((album) => album.id === albumId);

  if (!album) {
    notFound();
  }

  return (
    <div className="bg-neutral-900 text-white h-full rounded-lg overflow-hidden shadow-lg">
      <div
        className="relative w-full h-60 bg-cover bg-center"
        style={{
          backgroundImage: `url(${album.imageSrc})`,
          filter: "blur(20px) brightness(0.5)",
        }}
      ></div>
      <main className="relative p-6 sm:p-8 sm:-mt-40 -mt-60">
        <div className="flex items-center space-x-6 sm:space-x-8 p-6">
          <Image
            src={album.imageSrc}
            alt={album.title}
            width={192}
            height={192}
            className="w-32 h-32 sm:w-48 sm:h-48 rounded-lg shadow-lg"
          />
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold">{album.title}</h1>
            <p className="text-lg text-gray-400 mt-1">{album.artist}</p>
            <p className="text-sm text-gray-500 mt-2">
              {album.totalTracks} songs, {album.duration}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Button variant="primary">
                <FaPlayCircle className="mr-2" />
                Play
              </Button>
              <Button variant="secondary">
                <FaRandom className="mr-2" />
                Shuffle
              </Button>
              <Button variant="secondary">
                <FaPlusCircle className="mr-2" />
                Add to Playlist
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Tracks</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto border-collapse">
                <thead className="bg-neutral-700 text-white">
                  <tr>
                    <th className="py-3 px-4 border-b border-neutral-600">#</th>
                    <th className="py-3 px-4 border-b border-neutral-600">Title</th>
                    <th className="py-3 px-4 border-b border-neutral-600">Plays</th>
                    <th className="py-3 px-4 border-b border-neutral-600">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {album.tracks.map((track, index) => (
                    <tr
                      key={index}
                      className="hover:bg-neutral-700 transition-colors"
                    >
                      <td className="py-3 px-4 border-b border-neutral-600">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 border-b border-neutral-600">
                        <Link href={`/track/${track.audioUrl.split("/").pop()}`}>
                          <span className="text-green-400 hover:underline">
                            {track.title}
                          </span>
                        </Link>
                      </td>
                      <td className="py-3 px-4 border-b border-neutral-600">
                        {track.plays.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 border-b border-neutral-600">
                        {track.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
