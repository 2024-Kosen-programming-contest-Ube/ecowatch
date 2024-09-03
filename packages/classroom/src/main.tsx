import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@ecowatch/ui/src/global.css.ts";
import { HeadFont, HeadIcon } from "@ecowatch/ui";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { PageRoot } from "./root";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Helmet>
        {HeadFont()}
        {HeadIcon()}
      </Helmet>
      <PageRoot />
    </HelmetProvider>
  </StrictMode>,
);
