import { fetchData } from "@/app/actions/fetch-helper";
import { UserProfile } from "@/typings";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type AccountStoreState = {
  user_profiles: UserProfile[] | null;
};

type AccountStoreActions = {
  setUser: () => void;
  logout: () => void;
};

const initialState: AccountStoreState = {
  user_profiles: null,
};
export const useAccountStore = create<
  AccountStoreState & AccountStoreActions
>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setUser: async () => {
          const response = await fetchData("user-profiles/own");
          set({ user_profiles: await response });
        },
        logout: () => set({ user_profiles: null }),
      }),
      {
        partialize: (state) => ({ user: state.user_profiles }),
        name: "account-store",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);
