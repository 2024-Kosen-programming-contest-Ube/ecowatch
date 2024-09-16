import { Link } from "react-router-dom";
import * as css from "./buttonLinkMobile.css";

export const ButtonLinkMobile = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link to={href}>
      <button className={css.button} type="button">
        {text}
      </button>
    </Link>
  );
};
