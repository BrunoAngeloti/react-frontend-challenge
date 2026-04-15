import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthUser = {
  email: string;
  name: string;
};

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (payload: { token: string; user: AuthUser }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: ({ token, user }) =>
        set({
          token,
          user,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "cinedash-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);