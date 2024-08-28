export interface Resolve<T> {
  resolve: () => T;
}

export function resolver<T>(promise: Promise<T>): Resolve<T> {
  let status = "pending";
  let result: T;

  const suspender = promise.then(
    (r) => {
      status = "fulfilled";
      result = r;
    },
    (e) => {
      status = "rejected";
      result = e;
    },
  );

  const resolve = () => {
    if (status === "pending") {
      throw suspender;
    }
    if (status === "rejected") {
      throw result;
    }
    return result;
  };

  return { resolve };
}
