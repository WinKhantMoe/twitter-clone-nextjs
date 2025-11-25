import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";

const useChooseHomeTab = create(
  (set) => ({
  isChosenTab : "forYou",
  setIsChosenTab : (isChosenTab) => {set({isChosenTab})},
}),
);

export default useChooseHomeTab;