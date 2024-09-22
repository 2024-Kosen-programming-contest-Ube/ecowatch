export function postJson(input: RequestInfo | URL, json: string, header?: HeadersInit) {
  const headers = {
    "Content-Type": "application/json",
    ...header,
  };
  return fetch(input, { method: "POST", headers: headers, body: json, mode: "cors", credentials: "include" });
}

export function get(input: RequestInfo | URL, header?: HeadersInit) {
  const headers = {
    "Content-Type": "application/json",
    ...header,
  };
  return fetch(input, { method: "GET", headers: headers, mode: "cors", credentials: "include" });
}
