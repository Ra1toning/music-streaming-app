import { notFound } from "next/navigation";

interface Album {
  title: string;
  artist: string; 
  imageSrc: string;
  tracks: Array<{ title: string; audioUrl: string }>;
}

// Dynamic Album Page Component
export default async function AlbumPage({
  params,
}: {
  params: { albumId: string }; // Get the dynamic albumId from the URL
}) {
  const { albumId } = params;

  // Example album data
  const albums = [
    {
      id: "weeknd-dawn-fm",
      title: "Weeknd: Dawn FM",
      artist: "The Weeknd", // Add artist to data
      imageSrc: "/images/album/weeknd.jpg",
      tracks: [
        { title: "Track 1", audioUrl: "/audio/weeknd-track1.mp3" },
        { title: "Track 2", audioUrl: "/audio/weeknd-track2.mp3" },
      ],
    },
    {
      id: "gorillaz-tired-influence",
      title: "Gorillaz: The Tired Influence",
      artist: "Gorillaz", // Add artist to data
      imageSrc: "/images/album/gorillaz.jpg",
      tracks: [
        { title: "Track 1", audioUrl: "/audio/gorillaz-track1.mp3" },
        { title: "Track 2", audioUrl: "/audio/gorillaz-track2.mp3" },
      ],
    },
    {
        id: "hmk",
        title: "Gorillaz: The Tired Influence",
        artist: "Gorillaz", // Add artist to data
        imageSrc: "/images/album/gorillaz.jpg",
        tracks: [
          { title: "Track 1", audioUrl: "/audio/gorillaz-track1.mp3" },
          { title: "Track 2", audioUrl: "/audio/gorillaz-track2.mp3" },
        ],
      },
    // Additional albums...
  ];

  const album = albums.find((album) => album.id === albumId);

  // If the album is not found, return a 404 error
  if (!album) {
    notFound(); // Trigger Next.js's built-in 404 page
  }

  return (
    <div className="album-page bg-black text-white">
      {/* Album Cover and Title */}
      <div className="album-header flex flex-col items-center py-16 px-6">
        <img
          src={album.imageSrc}
          alt={album.title}
          className="w-64 h-64 rounded-lg shadow-md object-cover mb-6"
        />
        <h1 className="text-4xl font-bold">{album.title}</h1>
        <p className="text-xl text-gray-400">{album.artist}</p>
      </div>

      {/* Tracklist */}
      <div className="tracklist px-6">
        <h2 className="text-2xl font-semibold mb-4">Tracks</h2>
        <ul>
          {album.tracks.map((track, index) => (
            <li key={index} className="track-item flex items-center justify-between py-2 border-b border-gray-700">
              <span className="text-lg">{track.title}</span>
              <audio controls className="w-32">
                <source src={track.audioUrl} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
