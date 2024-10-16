import { Numpad } from "@/components/numpad";
import { useDayStatus } from "@/hooks/hookDayStatus";
import { BACKEND_URL } from "@/main";
import { postJson } from "@ecowatch/utils";
import { Suspense } from "react";
import * as css from "@/pages/leftovers/leftovers.css";

function SetPointInterface() {
  const previousStatus = useDayStatus();

  function submit(value: string) {
    postJson(`${BACKEND_URL}/classroom/set_point`, JSON.stringify({ point: Number(value) })).then((res) => {
      if (!res.ok) {
        console.error(res.statusText);
      } else {
        alert("設定しました");
      }
    });
  }

  return <Numpad displayHeader="ポイント" diaplayPrefix="" submit={submit} initialValue={previousStatus.value?.point ?? undefined} />;
}

const DemoSettingPage = () => {
  return (
    <div className={css.container}>
      <div className={css.center_container}>
        <h1 className={css.header}>ポイントを設定(デモ用)</h1>
        <Suspense>
          <SetPointInterface />
        </Suspense>
      </div>
    </div>
  );
};

export default DemoSettingPage;
