'use client'

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import useLoadArtistImage from "@/hooks/useLoadArtistImage";
import useLoadSongImage from "@/hooks/useLoadSongImage";
import { Artist, Song } from "@/types"

interface SongItemProps {
    data: Song,
    artist: Artist,
    onClick: (id: string) => void
};

const SongItem: React.FC<SongItemProps> = ({data, artist, onClick}) => {
    const songImagePath = useLoadSongImage(data);
    const artistImagePath = useLoadArtistImage(artist); 
    
    return (
        <div 
            className="relative bg-neutral-800 rounded-lg overflow-hidden shadow-md w-48 h-48 group cursor-pointer"
            onClick={() => onClick(data.id)}
        >
            <div className="relative">
                <Image
                    src={songImagePath || '/placeholder-image.png'}
                    alt={data.title}
                    width={192}
                    height={192}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90">
                    <div className="absolute bottom-2 left-0 right-0 px-2 flex flex-col">
                        <h2 className="text-white text-sm font-medium line-clamp-2 text-start transition-transform duration-300 ease-in-out group-hover:translate-y-0 group-hover:font-semibold">
                            {data.title}
                        </h2>
                        <p className="text-neutral-300 text-xs line-clamp-1">
                            {artist.author}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongItem;