import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  defaultView: "sign_in" | "sign_up"; 
  onOpen: (view: "sign_in" | "sign_up") => void; 
  onClose: () => void;
}

/**
 * @description
 * useAuthModal нь хэрэглэгчийн бүртгэл болон нэвтрэх модалын төлөвийг удирдах hook юм.
 * 
 * @example
 * ```typescript
 * const { isOpen, defaultView, onOpen, onClose } = useAuthModal();
 * 
 * // Модалыг нээх
 * onOpen("sign_up");
 * 
 * // Модалыг хаах
 * onClose();
 * ```
 * 
 * @returns {AuthModalStore} - Модалын төлөвийг удирдах функцууд болон төлөвийн объект.
 * 
 * @property {boolean} isOpen - Модал нээлттэй эсэхийг илэрхийлнэ.
 * @property {string} defaultView - Модалын анхны харагдац (sign_in эсвэл sign_up).
 * @property {(view: string) => void} onOpen - Модалыг нээх функц.
 * @property {() => void} onClose - Модалыг хаах функц.
 */
const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  defaultView: "sign_in", 
  onOpen: (view) => set({ isOpen: true, defaultView: view }),
  onClose: () => set({ isOpen: false, defaultView: "sign_in" }),
}));

export default useAuthModal;
