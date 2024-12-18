'use client'

import useAuthModal from "@/hooks/useAuthModal";
import { userUser } from "@/hooks/useUser";
import { Artist, Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MediaCards from "./MediaCards";
import useOnPlay from "@/hooks/useOnPlay";

interface FavoritePageContentProps {
    songs: Song[];
    artists: Artist[];
}

const FavoritePageContent: React.FC<FavoritePageContentProps> = ({ songs, artists }) => {
    const { user, isLoading } = userUser();
    const router = useRouter();
    const authModal = useAuthModal();
    const { onPlay } = useOnPlay(songs);

    useEffect(() => {
        if (!isLoading && !user) {
            authModal.onOpen("sign_in");
            router.replace("/");
        }
    }, [isLoading, user]);

    if (songs?.length === 0) {
        return <div className="flex w-full items-center justify-center text-neutral-400">No favorite songs found</div>
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mt-4 px-4 gap-4">
            {songs?.map((song) => (
                <MediaCards
                    key={song.id}
                    data={song}
                    artist={artists.filter((artist => artist.id === song.artist_id))[0]}
                    onClick={(id: string) => onPlay(id)}
                />
            ))}
        </div>
    )
}

export default FavoritePageContent;
