// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0lSa55_saHBz37YDKZwEbQkuy4ReRLbU",
  authDomain: "testing-b2a8c.firebaseapp.com",
  databaseURL: "https://testing-b2a8c-default-rtdb.firebaseio.com",
  projectId: "testing-b2a8c",
  storageBucket: "testing-b2a8c.appspot.com",
  messagingSenderId: "438940923553",
  appId: "1:438940923553:web:df9bfb31d86531b5aa62e0",
  measurementId: "G-NNRT1SJJS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 export const db = getDatabase(app);