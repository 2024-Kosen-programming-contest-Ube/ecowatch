// import { useSelect } from "@/components/select";
import * as css from "./login.css";
import { useEffect, useMemo, useState } from "react";
import { useInputSelect } from "@/components/inputSelect";
import { useInputText } from "@/components/inputText";
import { Submit } from "@/components/submit";
import { post_json } from "@/utils";
import { useNavigate } from "react-router-dom";

type AllClassrooms = {
  schools: { id: string; name: string }[];
  classrooms: { id: string; school_id: string; grade: number; name: string }[];
};

function LoginPage() {
  const navigate = useNavigate();

  const [allClassrooms, setAllClassrooms] = useState<AllClassrooms | null>(null);

  const schoolOptions = useMemo(() => {
    return (
      allClassrooms?.schools.map((v) => {
        console.log("key", v.id);
        return { key: v.id, value: v.name };
      }) ?? []
    );
  }, [allClassrooms]);

  const [inputSelectSchool, selectedSchool] = useInputSelect(schoolOptions);

  const gradeOptions = useMemo(() => {
    return [
      ...new Set(
        allClassrooms?.classrooms
          .filter((v) => {
            console.log(v.school_id, selectedSchool);
            return v.school_id === selectedSchool;
          })
          .map((v) => {
            return v.grade;
          }),
      ),
    ].map((v) => {
      return { key: String(v), value: String(v) };
    });
  }, [allClassrooms, selectedSchool]);

  const [inputSelectGrade, selectedGrade] = useInputSelect(gradeOptions);

  const nameOptions = useMemo(() => {
    return (
      allClassrooms?.classrooms
        .filter((v) => {
          return v.school_id === selectedSchool && String(v.grade) === selectedGrade;
        })
        .map((v) => {
          console.log("key", v.id);
          return { key: v.name, value: v.name };
        }) ?? []
    );
  }, [allClassrooms, selectedSchool, selectedGrade]);

  const [inputSelectName, selectedName] = useInputSelect(nameOptions);

  const [inputPassword, password] = useInputText();

  useEffect(() => {
    fetch("/api/classroom/get_all")
      .then((res) => {
        if (!res.ok) {
          console.error(res.statusText);
        }
        res.json().then((data) => {
          console.log("data", data);
          setAllClassrooms(data);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    console.log("selected", selectedSchool, selectedGrade, selectedName);
    const classroom = allClassrooms?.classrooms.find((v) => {
      return v.school_id === selectedSchool && String(v.grade) === selectedGrade && v.name === selectedName;
    });
    console.log("class", classroom);
  }, [allClassrooms, selectedSchool, selectedGrade, selectedName]);

  function submit() {
    const classroom = allClassrooms?.classrooms.find((v) => {
      return v.school_id === selectedSchool && String(v.grade) === selectedGrade && v.name === selectedName;
    });
    if (!classroom) {
      return;
    }
    const data = { class_id: classroom.id, password: password };
    const data_json = JSON.stringify(data);
    post_json("/api/classroom/login", data_json)
      .then((res) => {
        if (res.ok) {
          navigate("/main");
        } else {
          console.log(res.statusText);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className={css.container}>
      <div className={css.header} />
      <div className={css.input_container}>
        <div className={css.input_row}>
          <label className={css.label}>学校名</label>
          {inputSelectSchool}
        </div>
        <div className={css.input_row}>
          <label className={css.label}>学年</label>
          {inputSelectGrade}
        </div>
        <div className={css.input_row}>
          <label className={css.label}>クラス</label>
          {inputSelectName}
        </div>
        <div className={css.input_row}>
          <label className={css.label}>パスワード</label>
          {inputPassword}
        </div>
        <Submit onClick={submit}>ログイン</Submit>
      </div>
    </div>
  );
}

export default LoginPage;
