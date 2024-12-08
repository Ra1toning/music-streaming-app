'use client';

import Image from 'next/image';

const HistoryPage = () => {
  // Dummy data for listening history
  const history = [
    {
      id: 1,
      song_title: 'Blinding Lights',
      artist_name: 'The Weeknd',
      album_cover: '/images/album/akg.jpg',
      played_at: '2024-12-01T14:30:00Z',
    },
    {
      id: 2,
      song_title: 'Shape of You',
      artist_name: 'Ed Sheeran',
      album_cover: '/images/album/weeknd.jpg',
      played_at: '2024-12-01T13:20:00Z',
    },
    {
      id: 3,
      song_title: 'Someone Like You',
      artist_name: 'Adele',
      album_cover: '/images/album/gorillaz.jpg',
      played_at: '2024-12-01T12:15:00Z',
    },
  ];

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-white h-screen">
        <Image
          src="/images/history/empty-history.png"
          alt="No History"
          width={200}
          height={200}
          className="mb-6"
        />
        <h1 className="text-2xl font-bold mb-2">Your listening history is empty</h1>
        <p className="text-gray-400">Start listening to songs to see them appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Listening History</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="bg-neutral-800 p-4 rounded-lg shadow-md flex items-center space-x-4"
          >
            <Image
              src={entry.album_cover}
              alt={entry.song_title}
              width={60}
              height={60}
              className="rounded-md object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{entry.song_title}</h3>
              <p className="text-sm text-gray-400">{entry.artist_name}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(entry.played_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
