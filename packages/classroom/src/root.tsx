import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuPage from "./pages/menu/menu.tsx";
import MainPage from "./pages/main/main.tsx";
import AttendPage from "./pages/attend/attend.tsx";
import LoginPage from "./pages/login/login.tsx";
import { useCallback, useEffect, useState } from "react";
import { postJson } from "@ecowatch/utils";

type Sensor = {
  temperature: number;
  humidity: number;
  isPeople: boolean;
  lux: number;
  useairconditionaer: boolean;
  airconditionaertime: string;
};

export const PageRoot = () => {
  const [point, setPoint] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);

  const syncPoint = useCallback(async () => {
    fetch("/api/classroom/get_now_status").then((res) => {
      if (!res.ok) {
        console.error(res.statusText);
        if (res.status === 401) {
          // TODO: redirect login page
        }
        return;
      }
      res.json().then((data) => {
        if (!data || data.point === undefined) {
          console.error("Invalid data");
        }
        setPoint(data.point);
      });
    });
  }, []);

  const updateSensor = useCallback(() => {
    const sensor: Sensor = {
      temperature: 42.0,
      humidity: 70,
      isPeople: true,
      lux: 77.4,
      useairconditionaer: true,
      airconditionaertime: "2024-06-30-22:20:50",
    };
    setTemperature(sensor.temperature);
    setHumidity(sensor.humidity);

    postJson("/api/classroom/sensor", JSON.stringify(sensor)).then((res) => {
      if (!res.ok) {
        console.error(res.statusText);
        return;
      }
      res.json().then((value) => {
        console.log(value.point);
        setPoint(value.point);
      });
    });
  }, []);

  useEffect(() => {
    const id = setInterval(updateSensor, 1000 * 60); // 1分ごと
    return () => {
      clearInterval(id);
    };
  }, [updateSensor]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MenuPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="main" element={<MainPage point={point} temperature={temperature} humidity={humidity} syncPoint={syncPoint} />} />
          <Route path="attend" element={<AttendPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
