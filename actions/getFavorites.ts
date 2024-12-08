import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getFavorites = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies,
    });

    const {data: {session}} = await supabase.auth.getSession();



    const {data, error} = await supabase
    .from("favorites")
    .select("*, songs(*)")
    .eq("user_id", session?.user?.id);

    if(error) {
        console.log(error);
    }

    if(!data) {
        return [];
    }

    return data.map(item => ({...item.songs}));
};

export default getFavorites;