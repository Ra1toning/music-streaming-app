import { Albums } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

/**
 * @function
 * @name useLoadAlbumImage
 * @description Custom hook to load the album image.
 * @param {Albums} album - Object containing album information.
 * @returns {string | null} - Public URL of the album image or null.
 */
const useLoadAlbumImage = (album: Albums) => {
    const supabaseClient = useSupabaseClient();

    if (!album || !album.img_uri) {
        return null;
    }

    const { data } = supabaseClient.storage
        .from("images")
        .getPublicUrl(album.img_uri);

    return data?.publicUrl || null;
};

export default useLoadAlbumImage;
