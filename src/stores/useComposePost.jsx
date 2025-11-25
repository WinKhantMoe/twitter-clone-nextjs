import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";

const useComposePost = create(
  (set) => ({
  isOpen : false,
  setIsOpen : () => {set((state) => ({ isOpen : !state.isOpen}))},
}));

export default useComposePost;