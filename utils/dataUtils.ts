
import { Albums } from "@/types";

export function groupAlbumsByGenre(albums: Albums[]) {
  return albums.reduce((acc, album) => {
    const genre = album.genre || "Unknown"; 
    if(!acc[genre]) {
      acc[genre] = [];
    }
    acc[genre].push(album);
    return acc;
  }, {} as Record<string, Albums[]>);
}
