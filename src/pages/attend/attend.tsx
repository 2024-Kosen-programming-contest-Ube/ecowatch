import { useEffect, useState } from "react";
import * as css from "./attend.css";
import { useNavigate } from "react-router-dom";
import { post_json as postJson } from "@/utils";
import { useDayStatus } from "@/hooks/hookDayStatus";

function AttendPage() {
  const navigate = useNavigate();
  const previousStatus = useDayStatus();
  const [num, setNum] = useState("");

  useEffect(() => {
    if (previousStatus?.value?.attend) {
      setNum(String(previousStatus.value.attend));
    } else {
      setNum("");
    }
  }, [previousStatus]);

  function submit() {
    postJson("api/classroom/regist_attendance", JSON.stringify({ attendees: Number(num) }))
      .then(() => {
        navigate("/main");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function updateNum(num: number) {
    setNum((current) => {
      if (current.length > 3) {
        return current;
      }
      return `${current}${num}`;
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
    <div className={css.container}>
      <div className={css.center_container}>
        <h1 className={css.header}>本日の出席人数を入力してください</h1>
        <div className={css.main_container}>
          <div className={css.left_container}>
            <h2 className={css.display_header}>出席確認</h2>
            <div className={css.diaplay_container}>
              <div className={css.diaplay}>{num}</div>
              <p className={css.diaplay_prefix}>人</p>
            </div>
          </div>
          <div className={css.button_container}>
            {buttons}
            <button onClick={() => setNum("")} type="button" className={css.button}>
              ×
            </button>
            <button onClick={() => updateNum(0)} type="button" className={css.button}>
              0
            </button>
            <button onClick={() => submit()} type="button" className={css.button}>
              ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendPage;
