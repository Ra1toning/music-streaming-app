'use client'
import { useEffect, useState, FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Albums } from '@/types'; 

interface AlbumProps {
    album: Albums;
}

const AlbumPage: FC = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const [album, setAlbum] = useState<AlbumProps | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/albums/${id}`)
                .then(res => res.json())
                .then(data => setAlbum(data as AlbumProps))
                .catch(err => console.error('Error fetching album:', err));
        }
    }, [id]);

    if (!album) return <div>Loading...</div>;

    return (
        <div>
            <h1>{album.album.title}</h1>
            <Image src={album.album.img_uri} alt={album.album.title} width={500} height={500} />
            <p>{album.album.description}</p>
            {/* Албумын нэмэлт мэдээллийг энд оруулна */}
        </div>
    );
};

export default AlbumPage;
