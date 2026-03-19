"use client";


import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [scores, setScores] = useState<any[]>([]);

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: User | null) => {
       if (currentUser) {
       setUser(currentUser);

        // Fetch this user's survey data
        const q = query(
          collection(db, "surveys"),
          where("userId", "==", currentUser.uid)
        );

        const querySnapshot = await getDocs(q);

        const userScores: any[] = [];
        querySnapshot.forEach((doc) => {
          userScores.push(doc.data());
        });

        setScores(userScores);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      {!user && <p>Please log in</p>}

      {user && (
        <>
          <p>Welcome: {user.email}</p>

          <h2>Your Burnout Scores:</h2>

          {scores.length === 0 ? (
            <p>No survey data yet</p>
          ) : (
            <ul>
              {scores.map((s, index) => (
                <li key={index}>
                  Score: {s.burnoutScore} | Date:{" "}
                  {new Date(s.date.seconds * 1000).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}