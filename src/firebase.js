import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEznTdGjUkEvD97zPgBQl9pznALM48ajA",
  authDomain: "family-4ef74.firebaseapp.com",
  projectId: "family-4ef74",
  storageBucket: "family-4ef74.firebasestorage.app",
  messagingSenderId: "172979008208",
  appId: "1:172979008208:web:21158579716f54b00c64d5",
  measurementId: "G-WQTDQ5P2GE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
