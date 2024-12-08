'use client'
import Image from "next/image";
import Link from "next/link";
import useLoadAlbumImage from "@/hooks/useLoadAlbumImage";
import useGetArtistName from "@/hooks/useGetArtistName";
import { Albums } from "@/types";

interface AlbumCardProps {
  album: Albums;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const imageSrc = useLoadAlbumImage(album) || "/placeholder-image.png";
  const artistName = useGetArtistName(album.artist_id);

  return (
    <Link href={`/albums/${album.id}`} passHref>
      <div className="relative bg-neutral-800 rounded-lg overflow-hidden shadow-md w-48 h-48 group cursor-pointer">
        <Image
          src={imageSrc}
          alt={album.title}
          width={192}
          height={192}
          className="object-fill w-full h-full transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90">
          <div className="absolute bottom-2 left-0 right-0 px-2 flex flex-col justify-start">
            <h2 className="text-white text-sm font-medium line-clamp-2 text-start transition-transform duration-300 ease-in-out group-hover:translate-y-0 group-hover:font-semibold">
              {album.title}
            </h2>
            <p className="text-gray-400 text-xs font-light text-start mt-1 group-hover:text-white">
              {artistName}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;
