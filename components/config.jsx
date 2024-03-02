// const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAh8OsM9sJ5kGh8svAw16ipDnQQ8q9ZP6c",
  authDomain: "techadobe-70ad6.firebaseapp.com",
  databaseURL:
    "https://techadobe-70ad6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "techadobe-70ad6",
  storageBucket: "techadobe-70ad6.appspot.com",
  messagingSenderId: "275477244599",
  appId: "1:275477244599:web:848a1283e7086c954c3b32",
  measurementId: "G-6RTW5SRHLQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
