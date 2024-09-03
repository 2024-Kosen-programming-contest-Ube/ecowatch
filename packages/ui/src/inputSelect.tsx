import { useEffect, useMemo, useState } from "react";
import * as css from "./inputSelect.css";
import * as css_input from "./input.css";

type Props = {
  list: { key: string; value: string }[];
  label: string;
};

export function useInputSelect(props: Props): [JSX.Element, string | undefined] {
  const [selected, setSelected] = useState(props.list[0] ? props.list[0].key : undefined);

  useEffect(() => {
    setSelected(props.list[0] ? props.list[0].key : undefined);
  }, [props.list]);

  const options = useMemo(() => {
    return props.list.map((v) => {
      return (
        <option value={v.key} key={v.key}>
          {v.value}
        </option>
      );
    });
  }, [props.list]);

  const inputSelect = useMemo(() => {
    return (
      <div className={css_input.input_row}>
        <label className={css_input.label}>{props.label}</label>
        <label className={css.wrapper}>
          <select
            className={css.select}
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
            }}
          >
            {options}
          </select>
        </label>
      </div>
    );
  }, [options, props.label, selected]);

  return [inputSelect, selected];
}
