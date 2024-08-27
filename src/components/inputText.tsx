import { useState } from "react";
import * as css from "./inputText.css";

export function useInputText(): [JSX.Element, string] {
  const [value, setValue] = useState("");

  const inputText = <input value={value} onChange={(e) => setValue(e.target.value)} className={css.input} />;

  return [inputText, value];
}
