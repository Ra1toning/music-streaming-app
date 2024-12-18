import { Artist } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import {  useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

/**
 * @description
 * `useGetArtists` нь уран бүтээлчдийн жагсаалтыг авахад ашиглагддаг custom hook юм.
 * Энэ нь Supabase client-ийг ашиглан "artist" хүснэгтээс өгөгдлийг татаж авдаг.
 * 
 * @returns {object} - Уран бүтээлчдийн жагсаалт болон ачааллаж байгаа эсэхийг илэрхийлэх объект.
 * @property {boolean} isLoading - Өгөгдлийг ачааллаж байгаа эсэхийг илэрхийлнэ.
 * @property {Artist[]} artists - Уран бүтээлчдийн жагсаалт.
 * 
 * @example
 * ```typescript
 * const { isLoading, artists } = useGetArtists();
 * 
 * if (isLoading) {
 *   return <div>Loading...</div>;
 * }
 * 
 * return (
 *   <ul>
 *     {artists.map(artist => (
 *       <li key={artist.id}>{artist.name}</li>
 *     ))}
 *   </ul>
 * );
 * ```
 */
const useGetArtists = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [artists, setArtists] = useState<Artist[]>([]);

    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        setIsLoading(true);
    
        const fetchArtists = async () => {
            const {data } = await supabaseClient.from("artist").select("*");
    
            setArtists((data as Artist[]) || []);
            setIsLoading(false);
        }
    
        fetchArtists();
    }, [supabaseClient]);

    return useMemo(() => ({isLoading, artists}), [isLoading, artists]);
};

export default useGetArtists;