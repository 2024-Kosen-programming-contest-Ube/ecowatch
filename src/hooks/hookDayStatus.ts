import type { FetchedData } from "@/utils/fetchedData";
import { useEffect, useState } from "react";

export type DayStatus = {
  attend: number;
  class_id: string;
  date: string;
  point: number;
};

export function useDayStatus(): FetchedData<DayStatus> {
  const [status, setStatus] = useState<FetchedData<DayStatus>>({ value: null, unauthorized: false, error: null });

  useEffect(() => {
    fetch("/api/classroom/get_now_status")
      .then((res) => {
        if (!res.ok) {
          setStatus(() => {
            if (res.status === 401) {
              return { value: null, unauthorized: true, error: null };
            }
            return { value: null, unauthorized: true, error: new Error(res.statusText) };
          });
          return;
        }
        res
          .json()
          .then((data) => {
            if (data.attend && data.class_id && data.date && data.point != null) {
              setStatus(() => {
                const value = {
                  attend: data.attend,
                  class_id: data.class_id,
                  date: data.date,
                  point: data.point,
                };
                return { value: value, unauthorized: false, error: null };
              });
            }
          })
          .catch((err) => {
            console.error(err);
            setStatus(() => {
              return { value: null, unauthorized: false, error: err };
            });
          });
      })
      .catch((err) => {
        console.error(err);
        setStatus(() => {
          return { value: null, unauthorized: false, error: err };
        });
      });
  }, []);

  return status;
}
