import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

/**
 * @description Өгөгдсөн дууны ID-аар дууны мэдээллийг татаж авахад ашиглагдана.
 * @param {string} [id] - Дууны ID.
 * @returns {{ isLoading: boolean, song: Song | undefined }} - Дууны мэдээлэл болон ачааллаж байгаа эсэхийг илэрхийлнэ.
 */
const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*, artist(*)") 
        .eq("id", id)
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
  }, [id, supabaseClient]);

  return useMemo(() => ({ isLoading, song }), [isLoading, song]);
};

export default useGetSongById;
