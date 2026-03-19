"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Survey() {
  const [score, setScore] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);

  // 🔐 Get logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const submitSurvey = async () => {
    if (!user) {
      alert("You must be logged in");
      return;
    }

    await addDoc(collection(db, "surveys"), {
      userId: user.uid,
      burnoutScore: score,
      date: new Date()
    });

    alert("Survey saved");
  };

  return (
    <div>
      <h1>Burnout Survey</h1>

      <input
        type="number"
        min="1"
        max="5"
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
      />

      <button onClick={submitSurvey}>
        Submit
      </button>
    </div>
  );
}