import * as css from "./logout.css";
import { useEffect, useState } from "react";
import { postJson } from "@ecowatch/utils";
import { Link } from "react-router-dom";
import { Header } from "@ecowatch/ui";
import { BACKEND_URL } from "@/main";

const LogoutPage = () => {
  const [logouted, setLogouted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    postJson(`${BACKEND_URL}/classroom/logout`, "")
      .then((res) => {
        if (res.ok) {
          setLogouted(true);
        } else {
          setError(res.statusText);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  });

  const Message = () => {
    if (error) {
      return <p>エラー: {error}</p>;
    }
    if (logouted) {
      return (
        <>
          <p>ログアウトしました</p>

          <Link to="/login">
            <p>ログイン</p>
          </Link>
        </>
      );
    }
    return <p>ログアウト中・・・</p>;
  };

  return (
    <div className={css.container}>
      <Header title="ログイン" />
      <Message />
    </div>
  );
};

export default LogoutPage;
