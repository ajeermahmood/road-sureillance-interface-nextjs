// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx4hm-Yzj4XQePp0fjehQ1bAt7aCIsRY4",
  authDomain: "road-surveillance-app.firebaseapp.com",
  projectId: "road-surveillance-app",
  storageBucket: "road-surveillance-app.appspot.com",
  messagingSenderId: "531553604079",
  appId: "1:531553604079:web:e0db2e2c0ac69a1db2e61a",
  measurementId: "G-BR8RYB1FKM",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, auth, db };

