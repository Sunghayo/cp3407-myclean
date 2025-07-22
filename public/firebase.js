// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnusZ7fck0nU_b0iDZAbAUyliQ0Dbc5Mc",
  authDomain: "mycleanjcu.firebaseapp.com",
  projectId: "mycleanjcu",
  storageBucket: "mycleanjcu.firebasestorage.app",
  messagingSenderId: "137404600804",
  appId: "1:137404600804:web:e2bd6b28fe6d9b7cb637f1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
