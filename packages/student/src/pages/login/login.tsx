import * as css from "./login.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Submit, useInputSelect, useInputText } from "@ecowatch/ui";
import { postJson } from "@ecowatch/utils";

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
        return { key: v.id, value: v.name };
      }) ?? []
    );
  }, [allClassrooms]);

  const [inputSelectSchool, selectedSchool] = useInputSelect({ list: schoolOptions, label: "学校名" });

  const gradeOptions = useMemo(() => {
    return [
      ...new Set(
        allClassrooms?.classrooms
          .filter((v) => {
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

  const [inputSelectGrade, selectedGrade] = useInputSelect({ list: gradeOptions, label: "学年" });

  const nameOptions = useMemo(() => {
    return (
      allClassrooms?.classrooms
        .filter((v) => {
          return v.school_id === selectedSchool && String(v.grade) === selectedGrade;
        })
        .map((v) => {
          return { key: v.name, value: v.name };
        }) ?? []
    );
  }, [allClassrooms, selectedSchool, selectedGrade]);

  const [inputSelectName, selectedName] = useInputSelect({ list: nameOptions, label: "クラス" });

  const [inputStudentID, studentID] = useInputText({ label: "出席番号", type: "number" });

  useEffect(() => {
    fetch("/api/classroom/get_all")
      .then((res) => {
        if (!res.ok) {
          console.error(res.statusText);
          return;
        }
        res.json().then((data) => {
          setAllClassrooms(data);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function submit() {
    const classroom = allClassrooms?.classrooms.find((v) => {
      return v.school_id === selectedSchool && String(v.grade) === selectedGrade && v.name === selectedName;
    });
    if (!classroom) {
      return;
    }
    const data = { class_id: classroom.id, student_id: studentID };
    const data_json = JSON.stringify(data);
    postJson("/api/student/login", data_json)
      .then((res) => {
        if (res.ok) {
          navigate("/student/checklist");
        } else {
          console.error(res.statusText);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <Header title="ログイン" />
      <div className={css.input_container}>
        {inputSelectSchool}
        {inputSelectGrade}
        {inputSelectName}
        {inputStudentID}
        <Submit onClick={submit}>ログイン</Submit>
      </div>
    </div>
  );
}

export default LoginPage;
