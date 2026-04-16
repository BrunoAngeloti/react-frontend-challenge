import { AppRouterProvider } from "./router-provider";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

export function AppProvider() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <AppRouterProvider />
      </ThemeProvider>
    </QueryProvider>
  );
}