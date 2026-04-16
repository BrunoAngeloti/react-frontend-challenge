import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useThemeStore } from "../model/theme-store";

export function ThemeToggleButton() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const hasHydrated = useThemeStore((state) => state.hasHydrated);

  function handleToggle() {
    console.log("Toggling theme...");
    toggleTheme();
  }

  if (!hasHydrated) {
    return null;
  }

  return (
    <Button variant="outline" size="icon" onClick={handleToggle} aria-label="Alternar tema">
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}