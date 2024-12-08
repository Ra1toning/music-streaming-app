'use client'

import useLoadSongImage from "@/hooks/useLoadSongImage"
import { Artist, Song } from "@/types"
import { twMerge } from "tailwind-merge"
import Image from 'next/image';
import useLoadArtistImage from "@/hooks/useLoadArtistImage";
import { userUser } from "@/hooks/useUser";
import LikeButton from "./LikeButton";


interface MediaCardsProps {
    data: Song,
    artist: Artist,
    className?: string,
    onClick?: (id: string) => void
}

const MediaCards: React.FC<MediaCardsProps>= ({data, artist, className, onClick}) => {

    const songImagePath = useLoadSongImage(data);
    const artistImagePath = useLoadArtistImage(artist);

    const { user } = userUser();

    const handleClick = () => {
        if(onClick) {
            onClick(data.id);
        }
    };

  return (
<div onClick={handleClick} className={twMerge(`flex w-full text-white items-center justify-start px-4 py-2 rounded-md bg-neutral-400/10 drop-shadow-md gap-4 cursor-pointer opacity-75 hover:opacity-100`, className)}>
    <div className="aspect-square w-36 h-16 min-w-18 min-h-16 rounded-md overflow-hidden relative">
        <Image src={songImagePath || '/images/album/default.jpg'} alt={data.title} fill className="object-cover w-full h-full"/>
    </div>

    <div className="flex flex-col items-start justify-start gap-y-1">
        <p className="w-full md:w-40 text-sm md:text-base font-semibold overflow-hidden text-ellipsis line-clamp-1 md:line-clamp-2">
            {data.title}
        </p>

        {artist && (
            <div className="flex gap-2 items-center justify-start">
                <div className="relative aspect-square w-6 h-6 min-w-6 min-h-6 rounded-full overflow-hidden">
                    <Image src={artistImagePath || '/images/album/default.jpg'} alt={artist.author} fill className="object-cover w-full h-full"/>
                </div>
                <p className="text-sm text-neutral-100">{artist.author}</p>
            </div>
        )}
    </div>

    {user && (
        <LikeButton songId={data.id}/>
    )}
</div>



  )
}

export default MediaCards