// hooks/useOnPlay.ts
import { Song } from "@/types";
import usePlayer from "./usePlayer"
import { userUser } from "./useUser";  
import useAuthModal from "./useAuthModal";

/**
 * @description Хэрэглэгчийн тоглуулагчийг удирдах custom hook.
 * @param {Song[]} songs - Тоглуулах дууны жагсаалт.
 * @returns {{ onPlay: (id: string) => void, playAllSongs: () => void }} - Тоглуулах функцуудыг буцаана.
 * @example
 * const { onPlay, playAllSongs } = useOnPlay(songs);
 * onPlay("songId");
 * playAllSongs();
 */
const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const authModal = useAuthModal();
    const { user } = userUser();

    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen("sign_in");
        }
        player.setId(id);
        player.setIds(songs.map(song => song.id));
    };

    const playAllSongs = () => {
        if (!user) {
            return authModal.onOpen("sign_in");
        }
        if (songs.length > 0) {
            player.setIds(songs.map(song => song.id));
            player.setId(songs[0].id);
        }
    };

    return { onPlay, playAllSongs };
};

export default useOnPlay;
