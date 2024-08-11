import { Link } from "react-router-dom";
import * as css from "./menu.css";
import * as css_button from "../../styles/buttons.css";

function MenuPage() {
  function Button({ href, text }: { href: string; text: string }) {
    return (
      <Link to={href}>
        <button type="button" className={css_button.button_white}>
          {text}
        </button>
      </Link>
    );
  }

  return (
    <div className={css.container}>
      <div className={css.top_container}></div>
      <div className={css.button_container}>
        <Button href="/main" text="メイン画面" />
        <Button href="/setting" text="設定" />
      </div>
    </div>
  );
}

export default MenuPage;
