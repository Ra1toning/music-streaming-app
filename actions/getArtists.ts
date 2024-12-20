import { Artist } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getArtists = async (): Promise<Artist[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies,
    });

    const {data, error} = await supabase
    .from("artist")
    .select("*")
    .order("created_at", {ascending: false});

    if(error) {
        console.log(error);
    }

    return data ?? [];
};

export default getArtists;