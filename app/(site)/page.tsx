import getArtists from "@/actions/getArtists";
import getAlbums from "@/actions/getAlbums";
import PageContent from "@/components/PageContent";
;
import getSongs from "@/actions/getSongs";
import SongContent from "@/components/SongContent";

export default async function Home() {
  const albums = await getAlbums();
  const artists = await getArtists();
  const song = await getSongs();
  return (
    <div className="bg-neutral-900 h-full w-full rounded-lg overflow-auto pb-5">
      {/* Top Banner Section */}
      <div
        className="relative w-full h-3/6 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/banner1.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
      </div>
      {/* Page Content */}
       <PageContent albums={albums} artists={artists}/>
       <SongContent songs={song} artists={artists}/>
    </div>
  );
}
