import { Header } from "@/components/header";
import * as css from "./logout.css";
import { useEffect, useState } from "react";
import { postJson } from "@ecowatch/utils";
import { Link } from "react-router-dom";

const LogoutPage = () => {
  const [logouted, setLogouted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    postJson("/api/classroom/logout", "")
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

          <Link to="/teacher/login">
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
