import { create } from 'zustand';

interface AlbumModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * @description Альбомын модалын төлөвийг удирдах custom hook.
 * @returns {AlbumModalStore} Альбомын модалын төлөвийг удирдах функцуудыг агуулсан объект.
 * @property {boolean} isOpen - Модал нээлттэй эсэхийг илэрхийлэх төлөв.
 * @property {() => void} onOpen - Модалыг нээх функц.
 * @property {() => void} onClose - Модалыг хаах функц.
 */
const useAlbumModal = create<AlbumModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useAlbumModal;