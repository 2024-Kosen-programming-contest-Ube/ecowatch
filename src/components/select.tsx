import { useEffect, useMemo, useState } from "react";
import * as css from "./select.css";

export function useInputSelect(list: { key: string; value: string }[]): [JSX.Element, string | undefined] {
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

  const inputSelect = useMemo(() => {
    return (
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
    );
  }, [selected, options]);

  return [inputSelect, selected];
}
