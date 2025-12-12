import { create } from "zustand";
import {persist,createJSONStorage} from "zustand/middleware";

const useTweetComposeOpen = create(
  (set) => ({
  isOpen : false,
  setIsOpen : () => {set((state) => ({ isOpen : !state.isOpen}))},
}));

export default useTweetComposeOpen; 