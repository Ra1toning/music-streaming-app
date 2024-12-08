import {create} from "zustand";

interface PlayerStore {
    ids: string[],
    activeId?: string,
    setId: (id: string) => void,
    setIds: (ids: string[]) => void,
    reset: () => void;
}

/**
 * @description PlayerStore төрлийн төлөвийг үүсгэхэд ашиглагдана.
 * @returns PlayerStore төрлийн төлөвийг буцаана.
 * @example
 * const player = usePlayer();
 * player.setId('song123');
 * player.setIds(['song123', 'song456']);
 * player.reset();
 */
const usePlayer = create<PlayerStore>((set) => ({
    ids: [],
    activeId: undefined,
    setId: (id: string) => set({activeId: id}),
    setIds: (ids: string[]) => set({ids: ids}),
    reset: () => set({ids: [], activeId: undefined})
}));

export default usePlayer;