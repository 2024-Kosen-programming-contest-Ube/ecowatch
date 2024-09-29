import { Suspense } from "react";
import * as css from "./leftovers.css";
import { useNavigate } from "react-router-dom";
import { useDayStatus } from "@/hooks/hookDayStatus";
import { postJson } from "@ecowatch/utils";
import { Numpad } from "@/components/numpad";

function RegistLeftoversInterface() {
  const navigate = useNavigate();
  const previousStatus = useDayStatus();

  function submit(value: string) {
    postJson("api/classroom/regist_leftovers", JSON.stringify({ leftovers: Number(value) }))
      .then(() => {
        navigate("/main");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return <Numpad displayHeader="食べ残し" diaplayPrefix="g" submit={submit} initialValue={previousStatus.value?.leftovers ?? undefined} />;
}

function LeftoversPage() {
  return (
    <div className={css.container}>
      <div className={css.center_container}>
        <h1 className={css.header}>本日の食べ残し量をグラムで入力して下さい</h1>
        <Suspense>
          <RegistLeftoversInterface />
        </Suspense>
      </div>
    </div>
  );
}

export default LeftoversPage;
