import { useEffect, useState } from "react";
import weatherCloudyIcon from "@/assets/weather/cloudy.svg";
import weatherRainyIcon from "@/assets/weather/rainy.svg";
import weatherSnowyIcon from "@/assets/weather/snowy.svg";
import weatherSunnyCloudyIcon from "@/assets/weather/sunny_cloudy.svg";
import weatherSunnyIcon from "@/assets/weather/sunny.svg";
import weatherThunderstormIcon from "@/assets/weather/thunderstorm.svg";

enum Weather {
  SUNNY = "sunny",
  CLOUDY = "cloudy",
  SNOWY = "snowy",
  RAINY = "rainy",
  THUNDERSTORM = "thunderstorm",
  SUNNY_CLOUDY = "sunny_cloudy",
}

function getWeatherIcon(weather: Weather) {
  switch (weather) {
    case Weather.SUNNY:
      return weatherSunnyIcon;
    case Weather.CLOUDY:
      return weatherCloudyIcon;
    case Weather.SNOWY:
      return weatherSnowyIcon;
    case Weather.RAINY:
      return weatherRainyIcon;
    case Weather.THUNDERSTORM:
      return weatherThunderstormIcon;
    case Weather.SUNNY_CLOUDY:
      return weatherSunnyCloudyIcon;
  }
}

const weatherCode: { [key: number]: Weather } = {
  0: Weather.SUNNY, // 快晴
  1: Weather.SUNNY, // 晴れ
  2: Weather.SUNNY_CLOUDY, // 薄曇り
  3: Weather.CLOUDY, // 曇り
  45: Weather.CLOUDY, // 霧
  48: Weather.CLOUDY, // 氷霧
  51: Weather.RAINY, // 薄い霧雨
  53: Weather.RAINY, // 霧雨
  55: Weather.RAINY, // 濃い霧雨
  56: Weather.RAINY, // 薄い着氷性の霧雨
  57: Weather.RAINY, // 濃い着氷性の霧雨
  61: Weather.RAINY, // 小雨
  63: Weather.RAINY, // 雨
  65: Weather.RAINY, // 大雨
  66: Weather.RAINY, // 弱い氷雨
  67: Weather.RAINY, // 強い氷雨
  71: Weather.SNOWY, // 小雪
  73: Weather.SNOWY, // 雪
  75: Weather.SNOWY, // 大雪
  77: Weather.SNOWY, // 霧雪
  80: Weather.RAINY, // にわか雨
  81: Weather.RAINY, // 通り雨
  82: Weather.RAINY, // 集中豪雨
  85: Weather.SNOWY, // 弱いにわか雪
  86: Weather.SNOWY, // 強いにわか雪
  95: Weather.THUNDERSTORM, // 雷雨
  96: Weather.THUNDERSTORM, // 霰を伴う雷雨
  99: Weather.THUNDERSTORM, // 雹を伴う雷雨
};

export function useWeather(): [string | null, string | null] {
  const [weather, SetWeather] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation);
    const id = setInterval(
      () => {
        navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation);
      },
      1000 * 60 * 15, // 15分
    );
    return () => {
      clearInterval(id);
    };
  }, []);

  function successGeolocation(pos: GeolocationPosition) {
    const crd = pos.coords;

    const params = new URLSearchParams();
    params.set("timezone", "Asia/Tokyo");
    params.set("latitude", String(crd.latitude));
    params.set("longitude", String(crd.longitude));
    params.set("current", "weather_code");

    fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`)
      .then((res) => {
        res.json().then((data) => {
          if (data?.current?.weather_code !== undefined) {
            const code = Number(data.current.weather_code);
            if (code in weatherCode) {
              SetWeather(getWeatherIcon(weatherCode[code]));
              return;
            }
          }
          setError("天候情報の取得に失敗しました。");
        });
      })
      .catch((err) => {
        setError(`天候情報の取得に失敗しました。${err.message}`);
      });
  }

  function errorGeolocation(err: GeolocationPositionError) {
    setError(`位置情報の取得に失敗しました。ERROR(${err.code}): ${err.message}`);
  }

  return [weather, error];
}
