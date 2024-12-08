'use client'

import { Artist, Song } from "@/types"
import MediaCards from "./MediaCards"
import useOnPlay from "@/hooks/useOnPlay"

interface SearchContentProps {
    songs: Song[],
    artists: Artist[]
}

const SearchContent: React.FC<SearchContentProps> = ({songs, artists}) => {
    const onPlay = useOnPlay(songs);
    if(songs?.length === 0) {
        return <div className="flex w-full items-center justify-center text-neutral-400">No songs found</div>
    }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mt-4 px-4 gap-4">
        {songs?.map((song) => (
            <MediaCards key={song.id} data={song} artist={artists.filter((artist => artist.id === song.artist_id))[0]} onClick={(id: string) => onPlay(id)}/>
        ))}   
    </div>
  )
}

export default SearchContent;