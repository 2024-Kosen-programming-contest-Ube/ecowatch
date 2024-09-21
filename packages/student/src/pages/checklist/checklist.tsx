import { ButtonMobile, Header } from "@ecowatch/ui";
import submitIcon from "@/assets/submit.svg";
import * as css from "./checklist.css";
import { useEffect, useState } from "react";
import { postJson } from "@ecowatch/utils";
import { useNavigate } from "react-router-dom";

type CheckPoint = {
  id: string;
  title: string;
};

const checklistItems: CheckPoint[] = [
  { id: "c1", title: "電気をこまめに消した" },
  { id: "c2", title: "水を出しっぱなしにしなかった" },
  { id: "c3", title: "食べ物を残さなかった" },
  { id: "c4", title: "こまめな換気をした" },
  { id: "c5", title: "徒歩や自転車で移動した" },
  { id: "c6", title: "ゴミを分別して捨てた" },
  { id: "c7", title: "マイボトルを持ち歩いた" },
  { id: "c8", title: "エアコンの設定温度を控えめにした" },
  { id: "c9", title: "冷蔵庫のドアを開ける時間を短くした" },
  { id: "c10", title: "炊飯器や電気ポットの保温を止めた" },
  { id: "c11", title: "使っていない家電の電源プラグを抜いた" },
  { id: "c12", title: "家電を省電力モードで使った" },
  { id: "c13", title: "その他自分にできる対策をした" },
];

const ChecklistPage = () => {
  const navigate = useNavigate();
  const [exist, setExist] = useState<boolean | null>(null);
  const [checklist, setChecklist] = useState(() => {
    const list: { [key: string]: boolean } = {};
    for (const item of checklistItems) {
      list[item.id] = false;
    }
    return list;
  });

  useEffect(() => {
    fetch("/api/student/exist_checklist").then((res) => {
      if (!res.ok) {
        console.error(res.statusText);
        if (res.status === 401) {
          window.location.href = "/student/login";
        }
        return;
      }
      res.json().then((data) => {
        if (data.exist) {
          setExist(true);
        } else if (data.exist === false) {
          setExist(false);
        } else {
          console.error("Invalid data");
        }
      });
    });
  });

  const checklistElements = checklistItems.map((item) => {
    const handlerChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.checked);
      setChecklist((current) => {
        current[event.target.value] = event.target.checked;
        return structuredClone(current);
      });
    };

    return (
      <label key={item.id} className={css.checkbox_label}>
        <input type="checkbox" value={item.id} checked={checklist[item.id]} onChange={handlerChange} className={css.checkbox} />
        {item.title}
      </label>
    );
  });

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log(JSON.stringify({ checklist: checklist }));
    postJson("/api/student/checklist", JSON.stringify({ checklist: checklist })).then((res) => {
      if (!res.ok) {
        console.error(res.statusText);
        if (res.status === 401) {
          window.location.href = "/student/login";
        }
        return;
      }
      navigate("/student/point");
    });
  };

  const CheckExist = () => {
    if (exist === null) {
      return <p>Loading...</p>;
    }
    if (exist) {
      navigate("/student/point");
    }
    return (
      <>
        <div className={css.list_container}>{checklistElements}</div>
        <div className={css.button_container}>
          <ButtonMobile onClick={handleSubmit}>
            送信する
            <img src={submitIcon} alt="submit" className={css.button_icon} />
          </ButtonMobile>
        </div>
      </>
    );
  };

  return (
    <div>
      <Header title="チェックリスト" />
      <CheckExist />
    </div>
  );
};

export default ChecklistPage;
