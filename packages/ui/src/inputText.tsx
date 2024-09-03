import { useMemo, useState } from "react";
import * as css from "./inputText.css";
import * as css_input from "./input.css";

type Props = {
  label: string;
  type?: React.HTMLInputTypeAttribute;
};

export function useInputText(props: Props): [JSX.Element, string] {
  const [value, setValue] = useState("");

  const inputText = useMemo(() => {
    return (
      <div className={css_input.input_row}>
        <label className={css_input.label}>{props.label}</label>
        <input value={value} onChange={(e) => setValue(e.target.value)} className={css.input} type={props.type} />
      </div>
    );
  }, [props.label, props.type, value]);

  return [inputText, value];
}
