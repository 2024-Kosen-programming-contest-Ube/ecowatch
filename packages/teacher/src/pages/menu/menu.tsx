import { Header } from "@/components/header";
import * as css from "./menu.css";
import { Link } from "react-router-dom";

const MenuPage = () => {
  const MenuItem = ({ href, title }: { href: string; title: string }) => {
    return (
      <Link to={href}>
        <button className={css.menu_item} type="button">
          {title}
        </button>
      </Link>
    );
  };

  return (
    <div className={css.page_ground}>
      <Header title="教員メニュー" />
      <div className={css.menu_container}>
        <MenuItem href="/teacher/point" title="ポイント確認" />
        <MenuItem href="/teacher/logout" title="ログアウト" />
      </div>
    </div>
  );
};

export default MenuPage;
