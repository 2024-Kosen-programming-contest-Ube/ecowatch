import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuPage from "./pages/menu/menu.tsx";
import MainPage from "./pages/main/main.tsx";
import AttendPage from "./pages/attend/attend.tsx";
import LoginPage from "./pages/login/login.tsx";
import { useCallback, useEffect, useState } from "react";
import { get, postJson } from "@ecowatch/utils";
import { z } from "zod";
import LogoutPage from "./pages/logout/logout.tsx";
import SettingPage from "./pages/setting/setting.tsx";
import { BACKEND_URL } from "./main.tsx";
import LeftoversPage from "./pages/leftovers/leftovers.tsx";
import WifiPage from "./pages/setting/wifi/wifi.tsx";
import HistoryPage from "./pages/history/history.tsx";
import DemoSettingPage from "./pages/setting/demo.tsx";

// biome-ignore lint/security/noGlobalEval: <explanation>
const SENSOR_INTERVAL = eval(import.meta.env.VITE_SENSOR_INTERVAL);

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
  useairconditioner: z.boolean(),
  airconditioner_time: z.string(),
});

export type ClassPoint = z.infer<typeof schemaClassPoint>;

export type Sensor = z.infer<typeof schemaSensor>;

export const PageRoot = () => {
  const [classPoint, setClassPoint] = useState<ClassPoint>({ point: 0, rank: 0, class_num: 0 });
  const [sensor, setSensor] = useState<Sensor | null>(null);

  const syncPoint = useCallback(async () => {
    console.log("sync point");
    get(`${BACKEND_URL}/classroom/point`).then((res) => {
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
    get("/sensor/data/getinfo").then((res) => {
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
      postJson(`${BACKEND_URL}/classroom/sensor`, JSON.stringify(sensor)).then((res) => {
        if (!res.ok) {
          console.error(res.statusText);
          return;
        }
        res.json().then((value) => {
          if (value.point !== undefined) {
            syncPoint();
          } // TODO: apiから直接返す？
        });
      });
    }
  }, [sensor, syncPoint]);

  useEffect(() => {
    updateSensor();
    const id = setInterval(updateSensor, SENSOR_INTERVAL); // 1分ごと
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
          <Route path="logout" element={<LogoutPage />} />
          <Route path="setting" element={<SettingPage />} />
          <Route path="setting/wifi" element={<WifiPage />} />
          <Route path="setting/demo" element={<DemoSettingPage />} />
          <Route path="history" element={<HistoryPage />} />
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
          <Route path="leftovers" element={<LeftoversPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
