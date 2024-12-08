import useLoadArtistImage from "@/hooks/useLoadArtistImage";
import { Artist } from "@/types"
import Image from "next/image";

interface ModalArtistSelectionProps {
    data: Artist,
    onClick: (id : string) => void,
    selected : boolean,
}

const ModalArtistSelection : React.FC<ModalArtistSelectionProps> = ({data, onClick, selected}) => {

    const imagePath = useLoadArtistImage(data);
  return <div onClick={() => onClick(data.id)}
  className={`flex item-center justify-center border-2 px-2 py-1 rounded-md gap-2 ${selected ? "border-emerald-500" : 
    "border-neutral-400"}`}>
        <div className="w-6 h-6 flex items-center justify-center bg-neutral-400 rounded-md relative overflow-hidden">
            <Image alt={data.author} src={imagePath || "/images/album/default.jpg"} fill className="object-cover"/>
        </div>
        <p className="text-sm text-neutral-400 w-full truncate">{data.author}</p>
    </div>
}

export default ModalArtistSelection