export function post_json(input: RequestInfo | URL, json: string, header?: HeadersInit) {
  const headers = {
    "Content-Type": "application/json",
    ...header,
  };
  return fetch(input, { method: "POST", headers: headers, body: json, mode: "cors", credentials: "include" });
}
