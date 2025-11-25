import { create } from "zustand";
import {persist,createJSONStorage} from "zustand/middleware";

const useLogInModalOpen = create(
  (set) => ({
  isOpen : false,
  setIsOpen : () => {set((state) => ({ isOpen : !state.isOpen}))},
}));

export default useLogInModalOpen; 