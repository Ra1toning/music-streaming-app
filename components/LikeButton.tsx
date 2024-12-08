'use client'

import useAuthModal from "@/hooks/useAuthModal";
import { userUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { toast } from "react-toastify";

interface LikeButtonProps {
    songId: string
};

const LikeButton : React.FC<LikeButtonProps> = ({songId}) => {

    const router = useRouter();
    const { supabaseClient } = useSessionContext();
    const authModal = useAuthModal();
    const { user } = userUser();

    const [isLiked, setIsLiked] = useState(false);

    const Icon = isLiked ? HiHeart : HiOutlineHeart;

    const handleClick = async () => {
        if(!user) {
            return authModal.onOpen("sign_in");
        }

        if(isLiked) {
            const {error} = await supabaseClient
            .from('favorites')
            .delete()
            .eq('user_id', user?.id)
            .eq('song_id', songId);

            if(error) {
                toast.error("Something went wrong");
            } else {
                setIsLiked(false);
            }
        } else {
            const {error} = await supabaseClient
            .from('favorites')
            .insert([{user_id: user?.id, song_id: songId}]);

            if(error) {
                toast.error("Something went wrong");
            } else {
                setIsLiked(true);
                toast.success("Song added to favorites");
            }
        }
        router.refresh();
    }

    useEffect(() => {
        if(!user) {
            return;
        }

        const fetchData = async () => {
            const {data, error} = await supabaseClient
            .from('favorites')
            .select('*')
            .eq('user_id', user?.id)
            .eq('song_id', songId)
            .maybeSingle();

            if(!error && data) {
                setIsLiked(true);
            }   
        }
        fetchData();

    }, [songId, supabaseClient, user?.id]);

  return (
    <button onClick={handleClick} type="button" className="cursor-pointer ml-auto hover:opacity-75 transition">
        <Icon className={`text-lg ${isLiked ? "text-emerald-400" : 
        "text-neutral-400"
        }`} />
    </button>
  )
}

export default LikeButton