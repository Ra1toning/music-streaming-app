import { Artist } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

/**
 * @function useLoadArtistImage
 * @description Supabase ашиглан уран бүтээлчийн зургийг ачаалдаг hook.
 * @param {Artist} artist - Уран бүтээлчийн мэдээлэл агуулсан объект.
 * @returns {string | null} - Уран бүтээлчийн зургийн нийтийн URL эсвэл null.
 */
const useLoadArtistImage = (artist: Artist) => {
    const supabaseClient = useSupabaseClient();

    if(!artist) {
        return null;
    }

    const { data : imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(artist.picture);
    return imageData.publicUrl;
};

export default useLoadArtistImage;