import * as css from "./buttonMobile.css";
import type { ReactNode } from "react";

export const ButtonMobile = ({ children, onClick }: { children: ReactNode; onClick?: React.MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <button className={css.button} type="button" onClick={onClick}>
      {children}
    </button>
  );
};
