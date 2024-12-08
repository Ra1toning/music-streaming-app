import { Song } from "@/types"
import { useSupabaseClient } from "@supabase/auth-helpers-react"


/**
 * @function
 * @name useLoadSong
 * @description Дууны мэдээллийг ачааллахад ашиглагдана.
 * @param {Song} song - Ачаалах дууны объект.
 * @returns {string} - Дууны нийтийн URL хаяг.
 */
const useLoadSong = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if(!song) {
    return "";
  }

  const {data: songData} = supabaseClient.storage.from("songs").getPublicUrl(song.song_uri);

  return songData.publicUrl;
}

export default useLoadSong