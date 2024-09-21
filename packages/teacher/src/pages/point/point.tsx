import { useEffect, useState } from "react";
import * as css from "./point.css";
import { ButtonLinkMobile, Header } from "@ecowatch/ui";

const PointPage = () => {
  const [point, setPoint] = useState(0);

  useEffect(() => {
    fetch("/api/classroom/point").then((res) => {
      if (!res.ok) {
        console.error(res.statusText);
        if (res.status === 401) {
          window.location.href = "/teacher/login";
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
  });

  return (
    <div>
      <Header title="ポイント" />
      <div className={css.container}>
        <p className={css.point}>{point}</p>
        <div className={css.button_container}>
          <ButtonLinkMobile href="/teacher/menu" text="メニュー" />
        </div>
      </div>
    </div>
  );
};

export default PointPage;
