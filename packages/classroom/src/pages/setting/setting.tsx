import { LinkButtonBlue } from "@/components/linkButton";
import * as css from "./setting.css";
import { Header } from "@ecowatch/ui";

const SettingPage = () => {
  return (
    <div className={css.container}>
      <Header title="設定" />
      <div className={css.top_container}></div>
      <div className={css.button_container}>
        <LinkButtonBlue href="/logout" text="ログアウト" />
        <LinkButtonBlue href="/setting/wifi" text="Wifi設定" />
        <LinkButtonBlue href="/" text="戻る" />
      </div>
    </div>
  );
};

export default SettingPage;
