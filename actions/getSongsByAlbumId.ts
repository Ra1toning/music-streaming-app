// actions/getSongsByAlbumId.ts
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "@/types";

export default async function getSongsByAlbumId(albumId: string): Promise<Song[]> {
  const supabase = createServerComponentClient({
    cookies: cookies, // Хэрэглэгчийн session cookies эсвэл ашиглах боломжтой бол
  });

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("album_id", albumId);

  if (error) {
    console.error("Error fetching songs for album:", error.message);
    throw new Error("Failed to fetch songs");
  }

  return data as Song[];
}
