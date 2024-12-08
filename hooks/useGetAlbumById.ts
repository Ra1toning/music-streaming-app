import { Albums } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

/**
 * @function
 * @name useGetAlbumById
 * @description Өгөгдсөн цомгийн ID-аар цомгийн мэдээллийг авах custom hook.
 * @param {string} [id] - Цомгийн ID (заавал биш).
 * @returns {Object} - Цомгийн мэдээлэл болон ачааллаж байгаа эсэхийг илэрхийлэх объект.
 * @property {boolean} isLoading - Цомгийн мэдээллийг ачааллаж байгаа эсэх.
 * @property {Albums | undefined} album - Цомгийн мэдээлэл.
 * @example
 * const { isLoading, album } = useGetAlbumById("123");
 */
const useGetAlbumById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [album, setAlbum] = useState<Albums | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchAlbum = async () => {
      const { data, error } = await supabaseClient
        .from("albums")
        .select("*, artist(*)") // Include related artist data if necessary
        .eq("id", id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error("An error occurred while fetching the album");
      }

      setAlbum(data as Albums);
      setIsLoading(false);
    };

    fetchAlbum();
  }, [id, supabaseClient]);

  return useMemo(() => ({ isLoading, album }), [isLoading, album]);
};

export default useGetAlbumById;
