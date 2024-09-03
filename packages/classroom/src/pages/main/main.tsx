import { Link } from "react-router-dom";
import * as css from "./main.css";
import { useWeather } from "@/hooks/hookWeather";
import { useEffect, useState } from "react";

function MainPage({
  point,
  temperature,
  humidity,
  syncPoint,
}: {
  point: number;
  temperature: number;
  humidity: number;
  syncPoint: () => Promise<void>;
}) {
  // const hint = "エアコンを2時間使わないことで成人の木が一日で吸収する稜のCO2を削減できます";
  const [hint, setHint] = useState("エアコンを2時間使わないことで成人の木が一日で吸収する稜のCO2を削減できます");
  const [weatherIcon, weatherError] = useWeather();

  useEffect(() => {
    console.log("sync");
    syncPoint();
  }, [syncPoint]);

  useEffect(() => {
    if (weatherError) {
      setHint(weatherError);
    }
  }, [weatherError]);

  function Button({ href, text }: { href: string; text: string }) {
    return (
      <Link to={href}>
        <button type="button" className={css.button}>
          {text}
        </button>
      </Link>
    );
  }

  function Point() {
    return <p className={css.point}>{point ?? 0}</p>;
  }

  function WeatherIcon() {
    if (weatherIcon) {
      return <img src={weatherIcon} alt="weather icon" className={css.weather_icon} />;
    }
    return <div className={css.weather_icon} />;
  }

  return (
    <div className={css.background}>
      <div className={css.container}>
        <div className={css.container_top}>
          <div className={css.container_top_left}>
            <h1 className={css.point_header}>本日のCO2削減ポイント</h1>
            <Point />
            <div className={css.button_container}>
              <Button href="/attend" text="出席確認" />
              <Button href="/" text="メニュー" />
            </div>
          </div>
          <div className={css.container_top_right}>
            <h1 className={css.status_header}>気温/湿度</h1>
            <div className={css.temperature_outer_container}>
              <div className={css.temperature_inner_container}></div>
            </div>
            <h1 className={css.status_header}>天気/不快指数</h1>
            <div className={css.status_outer_container}>
              <div className={css.weather_inner_container}>
                <WeatherIcon />
              </div>
            </div>
          </div>
        </div>
        <div className={css.hint_container}>
          <h1 className={css.hint_header}>CO2削減ヒント</h1>
          <p className={css.hint}>{hint}</p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
