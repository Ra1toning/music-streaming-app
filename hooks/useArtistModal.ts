import { create } from "zustand";

interface ArtistModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * @description ArtistModalStore төрлийн төлөвийг удирдах custom hook.
 * @returns {ArtistModalStore} - Modal-ийн төлөвийг удирдах функцуудыг агуулсан обьект.
 * @property {boolean} isOpen - Modal нээлттэй эсэхийг илэрхийлэх төлөв.
 * @property {() => void} onOpen - Modal-ийг нээх функц.
 * @property {() => void} onClose - Modal-ийг хаах функц.
 */
const useArtistModal = create<ArtistModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useArtistModal;
