import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuPage from "./pages/menu/page.tsx";
import MainPage from "./pages/main/page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MenuPage />} />
          <Route path="main" element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
