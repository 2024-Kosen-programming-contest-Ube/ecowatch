export interface FetchedData<T> {
  value: T | null;
  unauthorized: boolean;
  error: Error | null;
}
