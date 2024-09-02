import { useCallback, useState } from "react";
import * as css from "./inputText.css";
import * as css_input from "./input.css";

export function useInputText(): [
  ({
    label,
    type,
  }: {
    label: string;
    type?: React.HTMLInputTypeAttribute;
  }) => JSX.Element,
  string,
] {
  const [value, setValue] = useState("");

  const InputText = useCallback(
    ({ label, type = "text" }: { label: string; type?: React.HTMLInputTypeAttribute }) => {
      return (
        <div className={css_input.input_row}>
          <label className={css_input.label}>{label}</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} className={css.input} type={type} />
        </div>
      );
    },
    [value],
  );

  return [InputText, value];
}
