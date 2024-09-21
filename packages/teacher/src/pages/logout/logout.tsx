import { useEffect, useState } from "react";
import { postJson } from "@ecowatch/utils";
import { Link } from "react-router-dom";
import { Header } from "@ecowatch/ui";

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
    <div>
      <Header title="ログアウト" />
      <Message />
    </div>
  );
};

export default LogoutPage;
