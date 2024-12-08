import { Song } from "@/types";
import usePlayer from "./usePlayer"
import { userUser } from "./useUser";
import useAuthModal from "./useAuthModal";

const useOnPlay = (songs: Song[]) => {

    const player = usePlayer();
    const authModal = useAuthModal();

    const { user } = userUser();

    const onPlay = (id : string) => {
        if(!user) {
            return authModal.onOpen("sign_in");
        }

        player.setId(id);
        player.setIds(songs.map(song => song.id));
    };
    return onPlay;
}

export default useOnPlay;