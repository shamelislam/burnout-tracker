"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import {
  generalSurvey,
  dailySurvey,
  weeklySurvey,
  monthlySurvey,
  habitSurvey
} from "@/lib/surveys";

import { calculateBurnout, getBurnoutLevel } from "@/lib/scoring";

function SurveyContent() {
  const params = useSearchParams();
  const type = params.get("type") || "general";

  const [user, setUser] = useState<User | null>(null);
  const [answers, setAnswers] = useState<any>({});

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  let survey = generalSurvey;
  if (type === "daily") survey = dailySurvey;
  else if (type === "weekly") survey = weeklySurvey;
  else if (type === "monthly") survey = monthlySurvey;
  else if (type === "habit") survey = habitSurvey;

  const handleChange = (id: string, val: number) => {
    setAnswers((prev: any) => ({ ...prev, [id]: val }));
  };

  const isSameWeek = (d1: Date, d2: Date) => {
    const oneJan = new Date(d1.getFullYear(), 0, 1);
    const getWeek = (d: Date) =>
      Math.ceil(
        ((d.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7
      );

    return (
      getWeek(d1) === getWeek(d2) &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const submit = async () => {
    if (!user) return alert("Login first");

    const q = query(
      collection(db, "surveys"),
      where("userId", "==", user.uid),
      where("type", "==", type)
    );

    const snap = await getDocs(q);
    const now = new Date();

    let block = false;

    snap.forEach((d) => {
      const prev = d.data().date.toDate();

      if (type === "daily" && prev.toDateString() === now.toDateString())
        block = true;

      if (type === "weekly" && isSameWeek(prev, now))
        block = true;

      if (
        type === "monthly" &&
        prev.getMonth() === now.getMonth() &&
        prev.getFullYear() === now.getFullYear()
      )
        block = true;
    });

    if (block) return alert("Already completed this period");

    const score = calculateBurnout(answers, type);

    await addDoc(collection(db, "surveys"), {
      userId: user.uid,
      type,
      answers,
      burnoutScore: score,
      level: getBurnoutLevel(score),
      date: new Date()
    });

    alert(`Submitted! Score: ${score}`);
    window.location.href = "/dashboard"; // ✅ redirect
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>{type} Survey</h1>

      {survey.map((q) => (
        <div key={q.id}>
          <p>{q.question}</p>

          {q.type === "scale" && (
            <>
              <input
                type="range"
                min={q.min}
                max={q.max}
                value={answers[q.id] ?? q.min}
                onChange={(e) =>
                  handleChange(q.id, Number(e.target.value))
                }
              />
              <span>{answers[q.id] ?? q.min}</span>
            </>
          )}

          {q.type === "multiple" && q.options && (
            <select
              onChange={(e) =>
                handleChange(q.id, Number(e.target.value))
              }
            >
              <option value="">Select</option>
              {q.options.map((o, i) => (
                <option key={i} value={i}>
                  {o}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}

      <button onClick={submit}>Submit</button>
    </div>
  );
}

// ✅ REQUIRED for useSearchParams
export default function Survey() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SurveyContent />
    </Suspense>
  );
}