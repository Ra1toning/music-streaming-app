'use client'

import AlbumModal from "@/components/AlbumModal";
import ArtistModal from "@/components/ArtistModal";
import AuthModal from "@/components/AuthModal";
import SongModal from "@/components/SongModal";
import { useEffect, useState } from "react"


const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

    return (
        <>
           <AuthModal />
           <ArtistModal />
           <SongModal />
           <AlbumModal />
        </>
    );
}

export default ModalProvider;