import getFavorites from "@/actions/getFavorites";
import FavoritePageContent from "@/components/FavoritePageContent";
import getArtists from "@/actions/getArtists";
import { HiHeart } from "react-icons/hi";

export const revalidate = 0;

const Favorites = async () => {
  try {
    const songs = await getFavorites();
    const artists = await getArtists();

    if (!songs || !artists) {
      throw new Error("Songs or artists data is missing.");
    }

    return (
      <div className="bg-neutral-900 h-full w-full rounded-lg overflow-auto">
        <div className="my-8 mx-8">
          <div className="flex flex-col md:flex-row items-center justify-start gap-4 mt-25">
            <div className="w-24 h-24 rounded-md lg:w-32 lg:h-32 flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-700 to-gray-500 transition">
              <HiHeart className="text-white text-3xl" />
            </div>
            <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start transition">
              <p className="hidden lg:block text-neutral-400 font-semibold">Playlist</p>
              <p className="text-white text-3xl lg:text-4xl font-bold">Favorite Songs</p>
            </div>
          </div>
          <div className="w-full flex-1">
            <FavoritePageContent songs={songs} artists={artists} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="bg-neutral-900 h-full w-full flex items-center justify-center">
        <p className="text-white">An error occurred while loading favorite songs.</p>
      </div>
    );
  }
};


export default Favorites