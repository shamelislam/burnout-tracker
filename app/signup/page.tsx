"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSignup = async () => {
    await createUserWithEmailAndPassword(auth,email,password);
    alert("Account created");
  };

  return (
    <div>
      <h1>Signup</h1>

      <input
        placeholder="email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        placeholder="password"
        type="password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>
        Create Account
      </button>
    </div>
  );
}