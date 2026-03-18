import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATuDR9O1joQ9OV9cK3D_B8fW1eod5cJxg",
  authDomain: "burnout-tracker-410e9.firebaseapp.com",
  projectId: "burnout-tracker-410e9",
  storageBucket: "burnout-tracker-410e9.firebasestorage.app",
  messagingSenderId: "752783488171",
  appId: "1:752783488171:web:dc2d47ac3931c1becb33ee"
};

const app = initializeApp(firebaseConfig);

// 🔐 Auth (for accounts)
export const auth = getAuth(app);

// 📊 Firestore (for burnout data)
export const db = getFirestore(app);