import { Albums } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadAlbumImage = (album: Albums) => {
    const supabaseClient = useSupabaseClient();

    if (!album || !album.img_uri) {
        return null;
    }

    const { data } = supabaseClient.storage
        .from("images")
        .getPublicUrl(album.img_uri);

    return data.publicUrl;
};

export default useLoadAlbumImage;
