import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@ecowatch/ui/src/global.css.ts";
import { HeadFont, HeadIcon } from "@ecowatch/ui";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <head>
      <HeadFont />
      <HeadIcon />
    </head>
    <BrowserRouter>
      <Routes>
        <Route path="/"></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
