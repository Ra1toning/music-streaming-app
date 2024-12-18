import getArtists from "@/actions/getArtists";
import getSongsByTitle from "@/actions/getSongsByTitle";
import SearchContent from "@/components/SearchContent";
import SearchInput from "@/components/SearchInput";

export const revalidate = 0;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams; 
  const title = typeof resolvedParams?.title === "string" ? resolvedParams.title : "";

  const songs = await getSongsByTitle(title);
  const artists = await getArtists();

  return (
    <div className="bg-neutral-900 h-full w-full rounded-lg overflow-auto">
      <div className="my-8 mx-8">
        <div>
          <h2 className="my-4 text-xl font-bold text-neutral-100">
            Search here by song title
          </h2>
          <SearchInput />
        </div>
        <div className="w-full flex-1">
          <SearchContent songs={songs} artists={artists} />
        </div>
      </div>
    </div>
  );
}
