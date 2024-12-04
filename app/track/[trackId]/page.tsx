import { notFound } from "next/navigation";
import { fetchAlbums } from "@/utils/dataUtils";
import Image from "next/image";
import Link from "next/link";
import { FaPlayCircle, FaHeart, FaShareAlt } from "react-icons/fa";

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

export default async function TrackPage({
  params,
}: {
  params: { trackId: string };
}) {
  const { trackId } = params;

  const albums = await fetchAlbums();

  let trackData = null;
  let albumData = null;

  for (const album of albums) {
    const track = album.tracks.find((t) => t.audioUrl.includes(trackId));
    if (track) {
      trackData = track;
      albumData = album;
      break;
    }
  }

  if (!trackData || !albumData) {
    notFound();
  }

  return (
    <div className="bg-neutral-900 text-white h-full rounded-lg overflow-hidden shadow-lg">
      <div
        className="relative w-full h-60 bg-cover bg-center"
        style={{
          backgroundImage: `url(${albumData.imageSrc})`,
          filter: "blur(20px) brightness(0.5)",
        }}
      ></div>
      <main className="relative p-6 sm:p-8 sm:-mt-40 -mt-60">
        <div className="flex items-center space-x-6 sm:space-x-8 p-6">
          <Image
            src={albumData.imageSrc}
            alt={albumData.title}
            width={192}
            height={192}
            className="w-32 h-32 sm:w-48 sm:h-48 rounded-lg shadow-lg"
          />
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold">{trackData.title}</h1>
            <p className="text-lg text-gray-400 mt-1">{albumData.artist}</p>
            <div className="flex items-center space-x-4 mt-2">
                <Link href={`${albumData.albumLink}`} passHref>
                    <p className="text-sm text-blue-400 cursor-pointer hover:underline">
                    Album: {albumData.title}
                    </p>
              </Link>
              <p className="text-sm text-gray-500">Duration: {trackData.duration}</p>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Button variant="primary">
                <FaPlayCircle className="mr-2" />
                Play
              </Button>
              <Button variant="secondary">
                <FaHeart className="mr-2" />
                Like
              </Button>
              <Button variant="secondary">
                <FaShareAlt className="mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Track Details</h2>
            <p className="text-sm text-gray-500">Plays: {trackData.plays.toLocaleString()}</p>
            <audio controls className="w-full mt-4">
              <source src={trackData.audioUrl} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </main>
    </div>
  );
}
