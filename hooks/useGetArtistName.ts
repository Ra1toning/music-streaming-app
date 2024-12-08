import { useState, useEffect, useMemo } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";

const useGetArtistName = (artistId: string | undefined) => {
  const [artistName, setArtistName] = useState<string>("");
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!artistId) return;

    const fetchArtist = async () => {
      const { data, error } = await supabaseClient
        .from("artist")
        .select("author")
        .eq("id", artistId)
        .single();

      if (error) {
        toast.error("Failed to fetch artist name.");
        return;
      }

      setArtistName(data?.author || "Unknown Artist");
    };

    fetchArtist();
  }, [artistId, supabaseClient]);

  return artistName;
};

export default useGetArtistName;
