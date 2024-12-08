'use client'

import React from 'react';
import { Artist, Albums } from "@/types";
import AlbumItem from './AlbumItem';
// Шинэ AlbumItem компонентыг дараа нь тодорхойлох болно.

interface PageContentProps {
    albums: Albums[];
    artists: Artist[];
};

const PageContent : React.FC<PageContentProps> = ({ albums, artists }) => {
    if (albums?.length === 0) {
        return (
            <div className="mt-4 text-neutral-400 w-full flex items-center justify-center">
                No albums found
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 mt-4 px-4 gap-4">
            {albums.map((album) => (
                <AlbumItem
                    key={album.id}
                    data={album}
                    // artists массив дундаас тухайн album-ийн artist_id-тай таарч буй artist-ийг олох
                    artist={artists.find((artist) => artist.id === album.artist_id)}
                    onClick={(id) => console.log(id)} 
                />
            ))}
        </div>
    );
};

export default PageContent;
