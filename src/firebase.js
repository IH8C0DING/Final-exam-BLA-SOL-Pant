import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBvq99pGTSs4vPZ9n9Sm5yKsbROFJcMVEc",
  authDomain: "bla-sol-pant.firebaseapp.com",
  projectId: "bla-sol-pant",
  storageBucket: "bla-sol-pant.firebasestorage.app",
  messagingSenderId: "459676913811",
  appId: "1:459676913811:web:55f01825bcd8720783fd66",
  databaseURL: "https://bla-sol-pant-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
