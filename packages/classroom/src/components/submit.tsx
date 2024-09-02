import type { ReactNode } from "react";
import * as css from "./submit.css";

export function Submit({ children, onClick }: { children: ReactNode; onClick: React.MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button type="button" onClick={onClick} className={css.submit}>
      {children}
    </button>
  );
}
