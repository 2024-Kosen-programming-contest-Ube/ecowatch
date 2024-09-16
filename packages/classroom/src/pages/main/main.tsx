import { Link } from "react-router-dom";
import * as css from "./main.css";
import { useWeather } from "@/hooks/hookWeather";
import { useEffect } from "react";
import { useHint } from "@/hooks/hookHint";
import type { ClassPoint } from "@/root";

const TemperatureHumidity = ({ temperature, humidity }: { temperature: number; humidity: number }) => {
  const decimal = Math.trunc((Math.abs(temperature) - Math.trunc(Math.abs(temperature))) * 10);
  return (
    <div className={css.temperature_humidity}>
      <p className={css.temperature_humidity_integer}>{Math.trunc(temperature)}</p>
      <div>
        <p className={css.temperature_humidity_symbol}>℃</p>
        <p className={css.temperature_humidity_decimal}>.{decimal}</p>
      </div>
      <p className={css.temperature_humidity_integer}>{Math.trunc(humidity)}</p>
      <p className={css.temperature_humidity_symbol}>%</p>
    </div>
  );
};

const DiscomfortIndex = ({ temperature, humidity }: { temperature: number; humidity: number }) => {
  return <p className={css.discomfort_index}>{Math.trunc(0.81 * temperature + 0.01 * humidity * (0.99 * temperature - 14.3) + 46.3)}</p>;
};

function MainPage({
  classPoint,
  temperature,
  humidity,
  syncPoint,
}: {
  classPoint: ClassPoint;
  temperature: number;
  humidity: number;
  syncPoint: () => Promise<void>;
}) {
  const hint = useHint();
  const [weatherIcon, weatherError] = useWeather();

  useEffect(() => {
    syncPoint();
  }, [syncPoint]);

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
    return <p className={css.point}>{classPoint.point ?? 0}</p>;
  }

  function WeatherIcon() {
    if (weatherIcon) {
      return <img src={weatherIcon} alt="weather icon" className={css.weather_icon} />;
    }
    return <div className={css.weather_icon} />;
  }

  const Message = () => {
    let message = hint;
    if (weatherError) {
      message = weatherError;
    }
    return <p className={css.hint}>{message}</p>;
  };

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
              <div className={css.temperature_inner_container}>
                <TemperatureHumidity temperature={temperature} humidity={humidity} />
              </div>
            </div>
            <h1 className={css.status_header}>天気/不快指数</h1>
            <div className={css.status_outer_container}>
              <div className={css.weather_inner_container}>
                <WeatherIcon />
                <DiscomfortIndex temperature={temperature} humidity={humidity} />
              </div>
            </div>
            <div className={css.rank_container}>
              <h1 className={css.rank_header}>クラス順位</h1>
              <p className={css.rank}>{classPoint.rank}</p>
              <p className={css.rank_prefix}>{`位(/${classPoint.class_num}クラス)`}</p>
            </div>
          </div>
        </div>
        <div className={css.hint_container}>
          <h1 className={css.hint_header}>CO2削減ヒント</h1>
          <Message />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
