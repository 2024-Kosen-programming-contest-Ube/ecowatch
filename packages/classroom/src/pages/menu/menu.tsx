import { useDayStatus } from "@/hooks/hookDayStatus";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { LinkButtonWhite } from "@/components/linkButton";
import * as css from "./menu.css";

function MenuPage() {
  function MainLoginButton() {
    const status = useDayStatus();

    if (status.unauthorized) {
      return <LinkButtonWhite href="/login" text="ログイン" />;
    }
    if (status.unauthorized === false && !status.error) {
      return <LinkButtonWhite href="/main" text="メイン画面" />;
    }
    <LinkButtonWhite href="/main" text="" />;
  }

  return (
    <div className={css.container}>
      <div className={css.top_container}></div>
      <div className={css.button_container}>
        <ErrorBoundary fallback={<LinkButtonWhite href="/" text="error" />}>
          <Suspense fallback={<LinkButtonWhite href="/" text="" />}>
            <MainLoginButton />
          </Suspense>
        </ErrorBoundary>
        <LinkButtonWhite href="/history" text="これまでのデータ" />
        <LinkButtonWhite href="/setting" text="設定" />
      </div>
    </div>
  );
}

export default MenuPage;
