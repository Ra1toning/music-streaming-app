import React from 'react';
import Image from 'next/image';

const dummyPlaylists = [
  {
    id: 1,
    name: 'Chill Vibes',
    description: 'Relax and unwind with these chill tunes.',
    image: '/images/album/weeknd.jpg',
  },
  {
    id: 2,
    name: 'Workout Mix',
    description: 'High-energy tracks to fuel your workout.',
    image: '/images/album/akg.jpg',
  },
  {
    id: 3,
    name: 'Top Hits',
    description: 'The hottest tracks of the week.',
    image: '/images/album/yonezu.jpg',
  },
  {
    id: 4,
    name: 'Acoustic Gems',
    description: 'Unplugged and soulful acoustic tracks.',
    image: '/images/album/gorillaz.jpg',
  },
  {
    id: 5,
    name: 'Party Beats',
    description: 'Get the party started with these bangers.',
    image: '/images/album/hmk.jpg',
  },
];

const PlayLists = () => {
  return (
    <div className="p-6 bg-neutral-900 text-white h-full">
      <h1 className="text-2xl font-bold mb-4">Playlists</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyPlaylists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-neutral-800 p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="relative w-full h-40 rounded-md overflow-hidden mb-3">
              <Image
                src={playlist.image}
                alt={playlist.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h2 className="text-lg font-semibold">{playlist.name}</h2>
            <p className="text-sm text-neutral-400">{playlist.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayLists;
