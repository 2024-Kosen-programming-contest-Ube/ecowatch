import { BACKEND_URL } from "@/main";
import { type FetchedData, type Resolve, resolver } from "@ecowatch/utils";
import { useEffect } from "react";

export type DayStatus = {
  attend: number;
  class_id: string;
  date: string;
  point: number;
};

let dayStatusFetcher: Resolve<Response> | null = null;
let dayStatusJsonFetcher: Resolve<DayStatus> | null = null;

export function useDayStatus(): FetchedData<DayStatus> {
  useEffect(() => {
    return () => {
      dayStatusFetcher = null;
      dayStatusJsonFetcher = null;
    };
  }, []);

  if (!dayStatusFetcher) {
    dayStatusFetcher = resolver(fetch(`${BACKEND_URL}/classroom/get_now_status`));
  }
  if (dayStatusFetcher && !dayStatusJsonFetcher) {
    const res = dayStatusFetcher.resolve();
    if (!res.ok) {
      if (res.status === 401) {
        return { value: null, unauthorized: true, error: null };
      }
      throw new Error(res.statusText);
    }
    dayStatusJsonFetcher = resolver<DayStatus>(res.json());
  }
  if (!dayStatusJsonFetcher) {
    throw Error("Unexpected");
  }
  const data = dayStatusJsonFetcher?.resolve();
  if (data.attend === undefined && data.class_id === undefined && data.date === undefined && data.point === undefined) {
    return { value: null, unauthorized: false, error: null };
  }
  if (data.attend === undefined || !data.class_id || !data.date || data.point == null) {
    console.log(data);
    throw Error("Invalid day status");
  }
  return { value: data, unauthorized: false, error: null };
}
