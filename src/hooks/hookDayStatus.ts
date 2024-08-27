import { useEffect, useState } from "react";

export type DayStatus = {
  attend: number;
  class_id: string;
  date: string;
  point: number;
};

export function useDayStatus(): DayStatus | null {
  const [status, setStatus] = useState<DayStatus | null>(null);

  useEffect(() => {
    fetch("/api/classroom/get_now_status")
      .then((res) => {
        if (!res.ok) {
          console.error(res.statusText);
          return;
        }
        res
          .json()
          .then((data) => {
            console.log(data);
            if (data.attend && data.class_id && data.date && data.point != null) {
              setStatus({
                attend: data.attend,
                class_id: data.class_id,
                date: data.date,
                point: data.point,
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return status;
}
