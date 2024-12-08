
import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

/**
 * @function useLoadSongImage
 * @description Энэ функц нь өгөгдсөн дууны зургийн URL-г ачаалж буцаана.
 * @param {Song} song - Дууны объект.
 * @returns {string | null} - Дууны зургийн нийтийн URL эсвэл null.
 */
const useLoadSongImage = (song: Song) => {
    const supabaseClient = useSupabaseClient();

    if(!song) {
        return null;
    }

    const { data : imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(song.image_uri);
    return imageData.publicUrl;
};

export default useLoadSongImage;