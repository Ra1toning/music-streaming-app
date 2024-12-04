import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  defaultView: "sign_in" | "sign_up"; 
  onOpen: (view: "sign_in" | "sign_up") => void; 
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  defaultView: "sign_in", 
  onOpen: (view) => set({ isOpen: true, defaultView: view }),
  onClose: () => set({ isOpen: false, defaultView: "sign_in" }),
}));

export default useAuthModal;
