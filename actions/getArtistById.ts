// /actions/getArtistById.ts
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Artist } from "@/types";

export default async function getArtistById(artistId: string): Promise<Artist | null> {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("artist")
    .select("*")
    .eq("id", artistId)
    .single();

  if (error) {
    console.error("Error fetching artist:", error.message);
    return null;
  }

  return data as Artist;
}
