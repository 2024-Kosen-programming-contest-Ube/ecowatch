import * as css from "./main.css";
import weatherSunnyLogo from "@/assets/weather/sunny.svg";

function MainPage() {
  const point = 500;
  // const temperature = 50;
  // const humidity = 50;
  // const isPeople = true;
  // const lux = 1;

  return (
    <div className={css.background}>
      <div className={css.container}>
        <div className={css.container_top}>
          <div className={css.container_top_left}>
            <h1 className={css.point_header}>本日のCO2削減ポイント</h1>
            <p className={css.point}>{point}</p>
          </div>
          <div className={css.container_top_right}>
            <h1 className={css.status_header}>気温/湿度</h1>
            <div className={css.temperature_outer_container}>
              <div className={css.temperature_inner_container}></div>
            </div>
            <h1 className={css.status_header}>天気/不快指数</h1>
            <div className={css.status_outer_container}>
              <div className={css.weather_inner_container}>
                <img src={weatherSunnyLogo} alt="sunny logo" className={css.weather_icon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
