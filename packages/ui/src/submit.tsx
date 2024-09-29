import type { ReactNode } from "react";
import * as css from "./submit.css";

export function Submit({
  children,
  onClick,
  disabled,
}: { children: ReactNode; onClick: React.MouseEventHandler<HTMLButtonElement>; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} className={css.submit} disabled={disabled}>
      {children}
    </button>
  );
}
