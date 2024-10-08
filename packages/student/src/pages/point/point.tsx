import { useEffect, useState } from "react";
import * as css from "./point.css";
import { Header } from "@ecowatch/ui";
import { BACKEND_URL } from "@/main";
import { get } from "@ecowatch/utils";

const PointPage = () => {
  const [point, setPoint] = useState(0);

  useEffect(() => {
    get(`${BACKEND_URL}/student/point`).then((res) => {
      if (!res.ok) {
        console.error(res.statusText);
        if (res.status === 401) {
          window.location.href = "/student/login";
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
      </div>
    </div>
  );
};

export default PointPage;
