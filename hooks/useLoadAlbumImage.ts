import { Albums } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

/**
 * @function
 * @name useLoadAlbumImage
 * @description Цомгийн зургийг ачаалах custom hook.
 * @param {Albums} album - Цомгийн мэдээллийг агуулсан объект.
 * @returns {string | null} - Цомгийн зургийн public URL эсвэл null.
 */
const useLoadAlbumImage = (album?: Albums): string | null => {
    const supabaseClient = useSupabaseClient();
  
    if (!album?.img_uri) {
      return null;
    }
  
    const { data } = supabaseClient.storage
      .from("images")
      .getPublicUrl(album.img_uri);
  
    return data?.publicUrl || null;
  };
  

export default useLoadAlbumImage;
