import { Suspense } from "react";
import * as css from "./attend.css";
import { useNavigate } from "react-router-dom";
import { useDayStatus } from "@/hooks/hookDayStatus";
import { postJson } from "@ecowatch/utils";
import { Numpad } from "@/components/numpad";

function AttendInterface() {
  const navigate = useNavigate();
  const previousStatus = useDayStatus();

  function submit(value: string) {
    postJson("api/classroom/regist_attendance", JSON.stringify({ attendees: Number(value) }))
      .then(() => {
        navigate("/main");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return <Numpad displayHeader="出席確認" diaplayPrefix="人" submit={submit} initialValue={previousStatus.value?.attend ?? undefined} />;
}

function AttendPage() {
  return (
    <div className={css.container}>
      <div className={css.center_container}>
        <h1 className={css.header}>本日の出席人数を入力してください</h1>
        <Suspense>
          <AttendInterface />
        </Suspense>
      </div>
    </div>
  );
}

export default AttendPage;
