import { Submit, useInputSelect, useInputText } from "@ecowatch/ui";
import * as css from "./wifi.css";
import { get } from "@ecowatch/utils";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const schemaWifiInfo = z.object({
  ssid: z.string(),
  signal_strength: z.string(),
});

const schemaWifiInfoList = z.array(schemaWifiInfo);

export type WifiInfo = z.infer<typeof schemaWifiInfo>;

const WifiPage = () => {
  const navigate = useNavigate();
  const [wifiInfoList, setWifiInfoList] = useState<WifiInfo[]>([]);

  const ssidOptions = useMemo(() => {
    return wifiInfoList.map((value) => {
      return { key: value.ssid, value: value.ssid };
    });
  }, [wifiInfoList]);

  const [inputSelectSSID, ssid] = useInputSelect({
    label: "SSID",
    list: ssidOptions,
  });
  const [inputTextPassword, password] = useInputText({ label: "パスワード", type: "password" });

  useEffect(() => {
    get("/sensor/wifi/getinfo").then((res) => {
      if (!res.ok) {
        console.error(res.statusText);
        return;
      }
      res.json().then((data) => {
        const parsed = schemaWifiInfoList.safeParse(data);
        if (parsed.success) {
          const list: WifiInfo[] = parsed.data;
          setWifiInfoList(list);
        } else {
          console.error(parsed.error);
        }
      });
    });
  }, []);

  const submit = () => {
    const params = new URLSearchParams({ ssid: ssid!, password: password });
    get(`/sensor/wifi/connect?${params.toString()}`)
      .then((res) => {
        if (!res.ok) {
          console.error(res.statusText);
          alert("接続に失敗しました");
          return;
        }
        res
          .json()
          .then((data) => {
            if (data.status === "connected") {
              console.log(`Connected wifi to ssid: ${data.status.ssid}`);
              alert("接続しました");
              navigate("/");
            } else {
              console.error(`Failed to connect wifi to ssid: ${ssid}`, data);
              alert("接続に失敗しました");
            }
          })
          .catch((error) => {
            console.error(`Failed to connect wifi to ssid: ${ssid}`, error);
            alert("接続に失敗しました");
          });
      })
      .catch((err) => {
        console.error(`Failed to connect wifi to ssid: ${ssid}`, err);
        alert("接続に失敗しました");
      });
  };

  return (
    <div className={css.background}>
      <div className={css.header} />
      <div className={css.input_container}>
        {inputSelectSSID}
        {inputTextPassword}
        <Submit onClick={submit} disabled={!ssid || !password}>
          接続
        </Submit>
      </div>
    </div>
  );
};

export default WifiPage;
