import { AppRouterProvider } from "./router-provider";
import { QueryProvider } from "./query-provider";

export function AppProvider() {
  return (
    <QueryProvider>
      <AppRouterProvider />
    </QueryProvider>
  );
}