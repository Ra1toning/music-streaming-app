import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

/**
 * @function useGetSongsByAlbumId
 * @description Тухайн цомгийн ID-аар дуунуудыг татах custom hook.
 * @param {string} [albumId] - Цомгийн ID.
 * @returns {{ isLoading: boolean, songs: Song[] }} - Дуунууд болон ачааллаж байгаа эсэхийг буцаана.
 * @example
 * const { isLoading, songs } = useGetSongsByAlbumId("albumId123");
 * 
 * if (isLoading) {
 *   // Ачааллаж байгаа үед хийх үйлдэл
 * }
 * 
 * return (
 *   <div>
 *     {songs.map(song => (
 *       <div key={song.id}>{song.title}</div>
 *     ))}
 *   </div>
 * );
 */
const useGetSongsByAlbumId = (albumId?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!albumId) {
      return;
    }

    setIsLoading(true);

    const fetchSongs = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*, artist(*)") // Худалдагчийн мэдээллийг оруулах бол "artist(*)" ашиглана
        .eq("album_id", albumId);

      if (error) {
        setIsLoading(false);
        toast.error("Дуунуудыг татах явцад алдаа гарлаа");
        return;
      }

      setSongs(data as Song[]);
      setIsLoading(false);
    };

    fetchSongs();
  }, [albumId, supabaseClient]);

  return useMemo(() => ({ isLoading, songs }), [isLoading, songs]);
};

export default useGetSongsByAlbumId;
