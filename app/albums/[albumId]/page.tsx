// components/AlbumPage.tsx
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from "next/image";
import useLoadAlbumImage from '@/hooks/useLoadAlbumImage';
import useGetAlbumById from '@/hooks/useGetAlbumById';
import useGetArtistName from '@/hooks/useGetArtistName';
import useGetSongsByAlbumId from '@/hooks/useGetSongsByAlbumId';
import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/types';

const Button = ({
  variant = "secondary",
  children,
  onClick,
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
}) => (
  <button
    className={`rounded-full px-6 py-3 flex items-center ${
      variant === "primary"
        ? "bg-green-500 text-white hover:bg-green-600"
        : "bg-neutral-700 text-white hover:bg-neutral-600"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);
export default function AlbumPage() {
  const params = useParams();
  const albumId = params.albumId as string;
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);

  const { isLoading: isAlbumLoading, album } = useGetAlbumById(albumId);
  const { isLoading: isSongsLoading, songs } = useGetSongsByAlbumId(albumId);
  const { onPlay, playAllSongs } = useOnPlay(songs);

  // Always call the hook, even if album is not yet available.
  const albumImageUrl = useLoadAlbumImage(album);
  const displayedAlbumImage = albumImageUrl || '/images/album/default.jpg';

  const artist = useGetArtistName(album?.artist_id);

  const handlePlay = (songUri: string) => {
    setCurrentPlaying(songUri);
    onPlay(songUri);
  };

  if (isAlbumLoading || isSongsLoading) {
    return <div className="text-white">Татаж байна...</div>;
  }

  if (!album) {
    return <div className="text-white">Альбом олдсонгүй</div>;
  }

  return (
    <div className="bg-neutral-900 text-white h-full rounded-lg overflow-hidden shadow-lg">
      <div
        className="relative w-full h-60 bg-cover bg-center"
        style={{
          backgroundImage: `url(${displayedAlbumImage})`,
          filter: "blur(20px) brightness(0.5)",
        }}
      ></div>
      <main className="relative p-6 sm:p-8 sm:-mt-40 -mt-60">
        <div className="flex items-center space-x-6 sm:space-x-8 p-6">
          <Image
            src={displayedAlbumImage}
            alt={album.title || 'Альбомны зураг'}
            width={192}
            height={192}
            className="w-32 h-32 sm:w-48 sm:h-48 rounded-lg shadow-lg"
          />
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold">{album.title}</h1>
            <p className="text-lg text-gray-400 mt-1">{artist}</p>
            <p className="text-sm text-gray-500 mt-2">{album.description}</p>
            <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Button variant="primary" onClick={playAllSongs}>Play All</Button>
              <Button variant="secondary">Shuffle</Button>
              <Button variant="secondary">Add to Playlist</Button>
            </div>
          </div>
        </div>
        <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Дуудлууд</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto border-collapse">
                <thead className="bg-neutral-700 text-white">
                  <tr>
                    <th className="py-3 px-4 border-b border-neutral-600">#</th>
                    <th className="py-3 px-4 border-b border-neutral-600">Title</th>
                    <th className="py-3 px-4 border-b border-neutral-600">Artist</th>
                  </tr>
                </thead>
                <tbody>
                  {songs.length > 0 ? (
                    songs.map((song: Song, index: number) => (
                      <tr
                        key={song.song_uri}
                        className="hover:bg-neutral-700 transition-colors"
                      >
                        <td className="py-3 px-4 border-b border-neutral-600">
                          {index + 1}
                        </td>
                        <td className="py-3 px-4 border-b border-neutral-600">
                          <button onClick={() => handlePlay(song.song_uri)} className={`text-green-400 hover:underline ${currentPlaying === song.song_uri ? 'font-bold' : ''}`}>
                            {song.title}
                          </button>
                        </td>
                        <td className="py-3 px-4 border-b border-neutral-600">
                          {artist || 'Unknown Artist'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-3 px-4 border-b border-neutral-600 text-gray-400">
                        Дуудлууд байхгүй байна.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
