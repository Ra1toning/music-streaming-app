import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

/**
 * @function useGetSongByUri
 * @description Энэ hook нь өгөгдсөн дууны URI-аар дууны мэдээллийг татаж авдаг.
 * @param {string} [songUri] - Дууны URI. Хэрэв энэ параметр байхгүй бол hook ямар ч үйлдэл хийхгүй.
 * @returns {{ isLoading: boolean, song: Song | undefined }} - Дууны мэдээлэл болон ачааллаж байгаа эсэхийг илэрхийлэх объект.
 * @example
 * const { isLoading, song } = useGetSongByUri("some-song-uri");
 * 
 * if (isLoading) {
 *   // Ачааллаж байгаа үед хийх үйлдэл
 * }
 * 
 * if (song) {
 *   // Дууны мэдээллийг ашиглах
 * }
 */
const useGetSongByUri = (songUri?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!songUri) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*, artist(*)") // Худалдагчийн мэдээллийг оруулах
        .eq("song_uri", songUri)
        .single();

      if (error) {
        setIsLoading(false);
        toast.error("Дуудлыг татах явцад алдаа гарлаа");
        console.error("Error fetching song:", error);
        return;
      }

      setSong(data as Song);
      setIsLoading(false);
    };

    fetchSong();
  }, [songUri, supabaseClient]);

  return useMemo(() => ({ isLoading, song }), [isLoading, song]);
};

export default useGetSongByUri;
