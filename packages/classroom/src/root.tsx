import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuPage from "./pages/menu/menu.tsx";
import MainPage from "./pages/main/main.tsx";
import AttendPage from "./pages/attend/attend.tsx";
import LoginPage from "./pages/login/login.tsx";
import { useCallback, useEffect, useState } from "react";
import { postJson } from "@ecowatch/utils";
import { z } from "zod";

const schemaClassPoint = z.object({
  point: z.number(),
  rank: z.number(),
  class_num: z.number(),
});

const schemaSensor = z.object({
  temperature: z.number(),
  humidity: z.number(),
  isPeople: z.boolean(),
  lux: z.number(),
  useairconditionaer: z.boolean(),
  airconditionaertime: z.string(),
});

export type ClassPoint = z.infer<typeof schemaClassPoint>;

export type Sensor = z.infer<typeof schemaSensor>;

export const PageRoot = () => {
  const [classPoint, setClassPoint] = useState<ClassPoint>({ point: 0, rank: 0, class_num: 0 });
  const [sensor, setSensor] = useState<Sensor | null>(null);

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

  const updateSensor = useCallback(async () => {
    console.log("scan sensor");
    fetch("/sensor/data/getinfo").then((res) => {
      if (!res.ok) {
        console.error(res.statusText);
        return;
      }
      res.json().then((data) => {
        const parsed = schemaSensor.safeParse(data);
        if (parsed.success) {
          const sensor: Sensor = parsed.data;
          setSensor(sensor);
        } else {
          console.error(parsed.error);
        }
      });
    });
  }, []);

  useEffect(() => {
    if (sensor) {
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
    }
  }, [sensor]);

  useEffect(() => {
    updateSensor();
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
          <Route
            path="main"
            element={
              <MainPage
                classPoint={classPoint}
                temperature={sensor?.temperature ?? 0}
                humidity={sensor?.humidity ?? 0}
                syncPoint={syncPoint}
              />
            }
          />
          <Route path="attend" element={<AttendPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
