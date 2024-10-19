import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@ecowatch/ui/src/global.css.ts";
import { HeadIcon } from "@ecowatch/ui";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { PageRoot } from "./root";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Helmet>
        {HeadIcon()}
      </Helmet>
      <PageRoot />
    </HelmetProvider>
  </StrictMode>,
);
