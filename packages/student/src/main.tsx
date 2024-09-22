import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "@ecowatch/ui/src/global.css.ts";
import { HeadFont, HeadIcon } from "@ecowatch/ui";
import { Helmet, HelmetProvider } from "react-helmet-async";
import LoginPage from "./pages/login/login";
import ChecklistPage from "./pages/checklist/checklist";
import PointPage from "./pages/point/point";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Helmet>
        {HeadFont()}
        {HeadIcon()}
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/student/checklist" />} />
          <Route path="/student" element={<Navigate replace to="/student/checklist" />} />
          <Route path="/student/login" element={<LoginPage />} />
          <Route path="/student/checklist" element={<ChecklistPage />} />
          <Route path="/student/point" element={<PointPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
