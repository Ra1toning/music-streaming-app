import Image from "next/image";
import Link from "next/link";

type TrendingItemProps = {
  title: string;
  imageSrc: string;
  albumLink: string;
};

const TrendingItem = ({ title, imageSrc, albumLink }: TrendingItemProps) => {
  return (
    <div className="relative bg-neutral-800 rounded-lg overflow-hidden shadow-md w-48 h-48">
      <Link href={albumLink} passHref>
        <div className="relative cursor-pointer">
          <Image
            src={imageSrc}
            alt={title}
            width={192}
            height={192}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent">
            <div className="absolute bottom-2 left-0 right-0 px-2 flex justify-start">
              <h2 className="text-white text-sm font-medium line-clamp-2 text-start">
                {title}
              </h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TrendingItem;
