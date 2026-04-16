import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemeMode = "dark" | "light";

type ThemeState = {
  theme: ThemeMode;
  hasHydrated: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      hasHydrated: false,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set({
          theme: get().theme === "dark" ? "light" : "dark",
        }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "cinedash-theme",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);