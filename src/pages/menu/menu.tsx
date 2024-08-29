import { Link } from "react-router-dom";
import * as css from "./menu.css";
import * as css_button from "../../styles/buttons.css";
import { useDayStatus } from "@/hooks/hookDayStatus";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

function MenuPage() {
  function LinkButton({ href, text }: { href: string; text: string }) {
    return (
      <Link to={href}>
        <button type="button" className={css_button.button_white}>
          {text}
        </button>
      </Link>
    );
  }

  function MainLoginButton() {
    const status = useDayStatus();

    if (status.unauthorized) {
      return <LinkButton href="/login" text="ログイン" />;
    }
    if (status.unauthorized === false && !status.error) {
      return <LinkButton href="/main" text="メイン画面" />;
    }
    <LinkButton href="/main" text="" />;
  }

  return (
    <div className={css.container}>
      <div className={css.top_container}></div>
      <div className={css.button_container}>
        <ErrorBoundary fallback={<LinkButton href="/" text="error" />}>
          <Suspense fallback={<LinkButton href="/" text="" />}>
            <MainLoginButton />
          </Suspense>
        </ErrorBoundary>
        <LinkButton href="/setting" text="設定" />
      </div>
    </div>
  );
}

export default MenuPage;
