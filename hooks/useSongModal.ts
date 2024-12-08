import { create } from "zustand";

interface SongModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * @description SongModalStore-ийг үүсгэхэд ашиглагддаг hook.
 * @returns {SongModalStore} SongModalStore-ийн төлөвийг удирдах функцуудыг агуулсан объект.
 * @example
 * const { isOpen, onOpen, onClose } = useSongModal();
 * 
 * // Модалыг нээх
 * onOpen();
 * 
 * // Модалыг хаах
 * onClose();
 */
const useSongModal = create<SongModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSongModal;
