import { startTransition, useState } from "react";
import * as css from "./numpad.css";
import { LinkButtonWhite } from "./linkButton";

export const Numpad = ({
  initialValue,
  displayHeader,
  diaplayPrefix,
  submit,
}: { initialValue?: number; displayHeader: string; diaplayPrefix: string; submit: (value: string) => void }) => {
  const [num, setNum] = useState(() => {
    if (initialValue) {
      return String(initialValue);
    }
    return "";
  });

  function updateNum(num: number) {
    startTransition(() => {
      setNum((current) => {
        // 4桁に制限
        if (current.length > 3) {
          return current;
        }
        return `${current}${num}`;
      });
    });
  }

  const buttons = (() => {
    const list = [];
    for (let i = 1; i <= 9; i++) {
      list.push(
        <button onClick={() => updateNum(i)} type="button" className={css.button} key={`${i}_button`}>
          {i}
        </button>,
      );
    }
    return list;
  })();

  return (
    <div className={css.main_container}>
      <div className={css.left_container}>
        <h2 className={css.display_header}>{displayHeader}</h2>
        <div className={css.diaplay_container}>
          <div className={css.diaplay}>{num}</div>
          <p className={css.diaplay_prefix}>{diaplayPrefix}</p>
        </div>
        <div className={css.back_button_container}>
          <LinkButtonWhite href="/main" text="戻る" />
        </div>
      </div>
      <div className={css.button_container}>
        {buttons}
        <button onClick={() => startTransition(() => setNum(""))} type="button" className={css.button}>
          ×
        </button>
        <button onClick={() => updateNum(0)} type="button" className={css.button}>
          0
        </button>
        <button onClick={() => submit(num)} type="button" className={css.button}>
          ok
        </button>
      </div>
    </div>
  );
};
