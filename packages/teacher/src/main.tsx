import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "@ecowatch/ui/src/global.css.ts";
import { HeadFont, HeadIcon } from "@ecowatch/ui";
import { Helmet, HelmetProvider } from "react-helmet-async";
import LoginPage from "./pages/login/login";
import MenuPage from "./pages/menu/menu";
import PointPage from "./pages/point/point";
import LogoutPage from "./pages/logout/logout";

const RootPage = () => {
  useEffect(() => {
    fetch("/api/classroom/get_now_status").then((res) => {
      if (!res.ok) {
        console.error(res.statusText);
        if (res.status === 401) {
          window.location.href = "/teacher/login";
        }
        return;
      }
      window.location.href = "/teacher/menu";
    });
  });
  return <></>;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Helmet>
        {HeadFont()}
        {HeadIcon()}
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/teacher/" />} />
          <Route path="/teacher/" element={<RootPage />} />
          <Route path="/teacher/login" element={<LoginPage />} />
          <Route path="/teacher/logout" element={<LogoutPage />} />
          <Route path="/teacher/menu" element={<MenuPage />} />
          <Route path="/teacher/point" element={<PointPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
