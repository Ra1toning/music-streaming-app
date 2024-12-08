'use client'

import { Artist, Song } from "@/types";
import SongItem from "./SongItem";

interface PageContentProps {
    songs: Song[];
    artists: Artist[];
};

const PageContent : React.FC<PageContentProps> = ({songs, artists}) => {

    if(songs?.length === 0) {
        return (
            <div className="mt-4 text-neutral-400 w-full flex items-center justify-center">
                No songs found
            </div>
        )
    }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 mt-4 px-4 gap-4">
        {songs?.map((song) => (
            <SongItem
                key={song.id}
                data={song}
                artist={artists?.filter(artist => artist.id === song.artist_id)[0]}
                onClick={(id) => console.log(id)} 
            />
        ))}
    </div>
  )
}

export default PageContent