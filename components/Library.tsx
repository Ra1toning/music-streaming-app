'use client';

import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';

const Library = () => {
    // Dummy data for the library
    const playlists = [
        {
            id: 1,
            name: 'Chill Vibes',
            description: 'Relaxing and calming tunes for a chill day.',
        },
        {
            id: 2,
            name: 'Workout Hits',
            description: 'High-energy tracks to keep you motivated.',
        },
        {
            id: 3,
            name: 'Classic Rock',
            description: 'Timeless rock hits that never get old.',
        },
        {
            id: 4,
            name: 'Pop Favorites',
            description: 'The best and latest pop hits in one playlist.',
        },
    ];

    const onClick = () => {
        alert('Add a new playlist!'); // Action for the "+" button
    };

    return (
        <div className="flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist size={26} className="text-neutral-400" />
                    <p className="text-neutral-400 font-medium text-md">Your Library</p>
                </div>
                <AiOutlinePlus
                    onClick={onClick}
                    size={20}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
            </div>

            {/* Playlists */}
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {playlists.map((playlist) => (
                    <div
                        key={playlist.id}
                        className="bg-neutral-800 rounded-md p-3 hover:bg-neutral-700 transition cursor-pointer"
                    >
                        <p className="text-white font-medium">{playlist.name}</p>
                        <p className="text-neutral-400 text-sm">{playlist.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Library;
