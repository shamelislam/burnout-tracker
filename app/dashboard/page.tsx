"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [scores, setScores] = useState<any[]>([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) return (window.location.href = "/login");

      setUser(u);

      const q = query(
        collection(db, "surveys"),
        where("userId", "==", u.uid)
      );

      const snap = await getDocs(q);

      const data: any[] = [];
      let total = 0;

      snap.forEach((doc) => {
        const d = doc.data();
        data.push(d);
        total += d.burnoutScore || 0;
      });

      setScores(data);
      setAvg(data.length ? Math.round(total / data.length) : 0);
    });

    return () => unsub();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <h2>Average Burnout: {avg}</h2>

      <div>
        <a href="/survey?type=general">General</a><br/>
        <a href="/survey?type=daily">Daily</a><br/>
        <a href="/survey?type=weekly">Weekly</a><br/>
        <a href="/survey?type=monthly">Monthly</a><br/>
        <a href="/survey?type=habit">Habit Survey</a>
      </div>

      <h3>History</h3>
      {scores.map((s, i) => (
        <p key={i}>
          {s.burnoutScore} ({s.type}) - {s.level}
        </p>
      ))}
    </div>
  );
}