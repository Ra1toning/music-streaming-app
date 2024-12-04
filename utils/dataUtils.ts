import { promises as fs } from "fs";
import path from "path";

export interface Track {
  title: string;
  audioUrl: string;
  duration: string;
  plays: number;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  genre: string;
  imageSrc: string;
  albumLink: string;
  duration: string;
  totalTracks: number;
  tracks: Track[];
}

export async function fetchAlbums(): Promise<Album[]> {
  const dataFilePath = path.join(process.cwd(), "public/data", "albums.json");
  const fileContents = await fs.readFile(dataFilePath, "utf8");
  const data = JSON.parse(fileContents);
  return data.albums;
}

export function groupAlbumsByGenre(albums: Album[]): { [key: string]: Album[] } {
  return albums.reduce((acc, album) => {
    if (!acc[album.genre]) {
      acc[album.genre] = [];
    }
    acc[album.genre].push(album);
    return acc;
  }, {} as { [key: string]: Album[] });
}