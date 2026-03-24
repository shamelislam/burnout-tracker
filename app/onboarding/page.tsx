"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Onboarding() {
  const [age, setAge] = useState("");
  const [school, setSchool] = useState("");

  const saveInfo = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Not logged in");
      return;
    }

    await setDoc(
      doc(db, "users", user.uid),
      {
        age,
        schoolLevel: school,
        createdAt: new Date()
      },
      { merge: true }
    );

    window.location.href = "/dashboard";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Complete Your Profile</h1>

      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <select onChange={(e) => setSchool(e.target.value)}>
        <option value="">Select School Level</option>
        <option value="middle">Middle School</option>
        <option value="high">High School</option>
        <option value="college">College</option>
      </select>

      <button onClick={saveInfo}>Continue</button>
    </div>
  );
}