import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuPage from "./pages/menu/menu.tsx";
import MainPage from "./pages/main/main.tsx";
import AttendPage from "./pages/attend/attend.tsx";
import LoginPage from "./pages/login/login.tsx";
import { useCallback, useEffect, useState } from "react";
import { postJson } from "@ecowatch/utils";
import { z } from "zod";

type Sensor = {
  temperature: number;
  humidity: number;
  isPeople: boolean;
  lux: number;
  useairconditionaer: boolean;
  airconditionaertime: string;
};

const schemaClassPoint = z.object({
  point: z.number(),
  rank: z.number(),
  class_num: z.number(),
});

export type ClassPoint = z.infer<typeof schemaClassPoint>;

export const PageRoot = () => {
  const [classPoint, setClassPoint] = useState<ClassPoint>({ point: 0, rank: 0, class_num: 0 });
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);

  const syncPoint = useCallback(async () => {
    console.log("sync point");
    fetch("/api/classroom/point").then((res) => {
      if (!res.ok) {
        console.error(res.statusText);
        if (res.status === 401) {
          window.location.href = "/login";
        }
        return;
      }
      res.json().then((data) => {
        const parsed = schemaClassPoint.safeParse(data);
        if (parsed.success) {
          setClassPoint(parsed.data);
        } else {
          console.error(parsed.error);
        }
      });
    });
  }, []);

  const updateSensorInternal = useCallback(() => {
    const sensor: Sensor = {
      temperature: 26.5,
      humidity: 60,
      isPeople: true,
      lux: 77.4,
      useairconditionaer: true,
      airconditionaertime: "2024-06-30-22:20:50",
    };
    setTemperature(sensor.temperature);
    setHumidity(sensor.humidity);
    return sensor;
  }, []);

  const updateSensor = useCallback(() => {
    const sensor = updateSensorInternal();

    postJson("/api/classroom/sensor", JSON.stringify(sensor)).then((res) => {
      if (!res.ok) {
        console.error(res.statusText);
        return;
      }
      res.json().then((value) => {
        console.log(value.point);
        setClassPoint(value.point);
      });
    });
  }, [updateSensorInternal]);

  useEffect(() => {
    updateSensorInternal();
    const id = setInterval(updateSensor, 1000 * 60); // 1分ごと
    return () => {
      clearInterval(id);
    };
  }, [updateSensor, updateSensorInternal]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MenuPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="main"
            element={<MainPage classPoint={classPoint} temperature={temperature} humidity={humidity} syncPoint={syncPoint} />}
          />
          <Route path="attend" element={<AttendPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
