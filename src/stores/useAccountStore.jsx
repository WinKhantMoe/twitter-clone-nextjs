import { use } from "react";
import { create} from "zustand";
import {persist,createJSONStorage} from "zustand/middleware";
import { zustandIndexedDBStorage } from "../services/zustandIndexedDBStorage";

const useAccountStore = create(
  persist(
    (set) => ({
      account : {},
      token : null,
      setToken : (token) => set({token : String(token)}),
      setAccount : (account) => set({account}),
      logout : () => set({ account : {},token : null}),
    }),
    {
      name : "account-storage",
      storage: zustandIndexedDBStorage,
      partialize: (state) => ({account: state.account,token : state.token}),
    }
  )
)

export default useAccountStore;