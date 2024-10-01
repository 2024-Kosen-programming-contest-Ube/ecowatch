import { BACKEND_URL } from "@/main";
import { type FetchedData, get, type Resolve, resolver } from "@ecowatch/utils";
import { useEffect } from "react";
import { z } from "zod";

export const schemaDayStatus = z.object({
  class_id: z.string(),
  point: z.number(),
  attend: z.number().nullable(),
  date: z.string(),
  leftovers: z.number().nullable(),
});

export type DayStatus = z.infer<typeof schemaDayStatus>;

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
    dayStatusFetcher = resolver(get(`${BACKEND_URL}/classroom/get_now_status`));
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
  const data = dayStatusJsonFetcher.resolve();
  const parsed = schemaDayStatus.safeParse(data);
  if (parsed.success) {
    return { value: parsed.data, unauthorized: false, error: null };
  }
  console.error(parsed.error);
  throw Error(parsed.error.message);
}
