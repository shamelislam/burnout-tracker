"use client";

import { useState } from "react";
import { db, auth } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Survey(){

  const [score,setScore] = useState(0);

  const submitSurvey = async () => {

    const user = auth.currentUser;

    await addDoc(collection(db,"surveys"),{
      userId: user.uid,
      burnoutScore: score,
      date: new Date()
    });

    alert("Survey saved");
  };

  return(
    <div>

      <h1>Burnout Survey</h1>

      <input
        type="number"
        min="1"
        max="5"
        onChange={(e)=>setScore(e.target.value)}
      />

      <button onClick={submitSurvey}>
        Submit
      </button>

    </div>
  );
}