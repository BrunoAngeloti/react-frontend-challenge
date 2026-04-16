import { useEffect } from "react";

import { useThemeStore } from "@/features/theme-toggle/model/theme-store";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useThemeStore((state) => state.theme);
  const hasHydrated = useThemeStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
  }, [theme, hasHydrated]);

  return <>{children}</>;
}