import { notFound } from "next/navigation";
import { fetchAlbums } from "@/utils/dataUtils";
import Image from "next/image";
import { FaPlayCircle, FaRandom, FaPlusCircle } from "react-icons/fa";

const Button = ({
  variant,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
}) => (
  <button
    className={`rounded-full px-4 py-2 flex items-center ${
      variant === "primary"
        ? "bg-green-500 text-white hover:bg-green-600"
        : "bg-neutral-700 text-white hover:bg-neutral-600"
    }`}
    {...props}
  >
    {children}
  </button>
);

const Table = ({ children }: { children: React.ReactNode }) => (
  <table className="w-full text-left border-collapse">{children}</table>
);

const TableHead = ({ children }: { children: React.ReactNode }) => (
  <thead>{children}</thead>
);

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);

const TableRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <tr className={`hover:bg-neutral-800 ${className}`}>{children}</tr>
);

const TableCell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <td className={`py-2 ${className}`}>{children}</td>
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
    <div className="bg-neutral-900 text-white min-h-screen">
      <main className="p-8">
        <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-md">
          <div className="flex items-center space-x-6 p-6">
            <Image
              src={album.imageSrc}
              alt={album.title}
              width={192}
              height={192}
              className="w-48 h-48 rounded-lg shadow-lg"
            />
            <div>
              <h1 className="text-4xl font-bold">{album.title}</h1>
              <p className="text-lg text-gray-400">{album.artist}</p>
              <p className="text-sm text-gray-500 mt-2">
                {album.totalTracks} songs, {album.duration}
              </p>
              <div className="mt-4 flex items-center space-x-4">
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
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Tracks</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Plays</TableCell>
                  <TableCell>Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {album.tracks.map((track, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{track.title}</TableCell>
                    <TableCell>{track.plays.toLocaleString()}</TableCell>
                    <TableCell>{track.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}