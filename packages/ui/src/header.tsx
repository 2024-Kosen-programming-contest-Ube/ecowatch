import * as css from "./header.css";

export const Header = ({ title }: { title: string }) => {
  return (
    <div className={css.header_container}>
      <p className={css.title}>{title}</p>
    </div>
  );
};
