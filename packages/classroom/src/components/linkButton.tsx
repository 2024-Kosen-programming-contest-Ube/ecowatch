import { Link } from "react-router-dom";
import * as css_button from "./linkButton.css";

export function LinkButtonWhite({ href, text }: { href: string; text: string }) {
  return (
    <Link to={href}>
      <button type="button" className={css_button.button_white}>
        {text}
      </button>
    </Link>
  );
}

export function LinkButtonBlue({ href, text }: { href: string; text: string }) {
  return (
    <Link to={href}>
      <button type="button" className={css_button.button_blue}>
        {text}
      </button>
    </Link>
  );
}
