import Image from "next/image";
import Link from "next/link";

type AlbumCardProps = {
  title: string;
  imageSrc: string;
  albumLink: string;
};

const AlbumCard = ({ title, imageSrc, albumLink }: AlbumCardProps) => {
  return (
    <div className="relative bg-neutral-800 rounded-lg overflow-hidden shadow-md w-48 h-48 group">
      <Link href={albumLink} passHref>
        <div className="relative cursor-pointer">
          <Image
            src={imageSrc}
            alt={title}
            width={192}
            height={192}
            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90">
            <div className="absolute bottom-2 left-0 right-0 px-2 flex justify-start">
              <h2 className="text-white text-sm font-medium line-clamp-2 text-start transition-transform duration-300 ease-in-out group-hover:translate-y-0 group-hover:font-semibold">
                {title}
              </h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AlbumCard;
