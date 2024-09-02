import { useCallback, useEffect, useMemo, useState } from "react";
import * as css from "./inputSelect.css";
import * as css_input from "./input.css";

export function useInputSelect(
  list: { key: string; value: string }[],
): [({ label }: { label: string }) => JSX.Element, string | undefined] {
  const [selected, setSelected] = useState(list[0] ? list[0].key : undefined);

  useEffect(() => {
    setSelected(list[0] ? list[0].key : undefined);
  }, [list]);

  const options = useMemo(() => {
    return list.map((v) => {
      return (
        <option value={v.key} key={v.key}>
          {v.value}
        </option>
      );
    });
  }, [list]);

  const InputSelect = useCallback(
    ({ label }: { label: string }) => {
      return (
        <div className={css_input.input_row}>
          <label className={css_input.label}>{label}</label>
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
    },
    [selected, options],
  );

  return [InputSelect, selected];
}
