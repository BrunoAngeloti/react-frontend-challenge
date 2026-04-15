import type { PropsWithChildren } from "react";
import { QueryProvider } from "./query-provider";
import { AppRouterProvider } from "./router-provider";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <AppRouterProvider />
      {children}
    </QueryProvider>
  );
}