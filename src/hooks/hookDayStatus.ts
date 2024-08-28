import type { FetchedData } from "@/utils/fetchedData";
import { type Resolve, resolver } from "@/utils/resolver";
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
    dayStatusFetcher = resolver(fetch("/api/classroom/get_now_status"));
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
  if (!data.attend || !data.class_id || !data.date || data.point == null) {
    throw Error("Invalid day status");
  }
  return { value: data, unauthorized: false, error: null };
}
