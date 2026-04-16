import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/app/styles/globals.css";
import { AppProvider } from "@/app/providers/app-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>,
);