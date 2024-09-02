import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@ecowatch/ui/src/global.css.ts";
import MenuPage from "./pages/menu/menu.tsx";
import MainPage from "./pages/main/main.tsx";
import AttendPage from "./pages/attend/attend.tsx";
import LoginPage from "./pages/login/login.tsx";
import { HeadFont, HeadIcon } from "@ecowatch/ui";
import { Helmet, HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Helmet>
        {HeadFont()}
        {HeadIcon()}
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<MenuPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="main" element={<MainPage />} />
            <Route path="attend" element={<AttendPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
