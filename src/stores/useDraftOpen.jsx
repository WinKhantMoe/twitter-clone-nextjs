import { create } from "zustand";
import {persist,createJSONStorage} from "zustand/middleware";

const useDraftOpen = create(
  (set) => ({
  isOpen : false,
  setIsOpen : () => {set((state) => ({ isOpen : !state.isOpen}))},
}));

export default useDraftOpen; 