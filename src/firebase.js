// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "gfdhjfdgbd",
  authDomain: "wochale-platform.firebaseapp.com",
  projectId: "wochale-platform",
  storageBucket: "wochale-platform.firebasestorage.app",
  messagingSenderId: "632318340917",
  appId: "1:632318340917:web:ed44b9ba5cd3048273e67c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
