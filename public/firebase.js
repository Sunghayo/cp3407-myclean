import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnusZ7fck0nU_b0iDZAbAUyliQ0Dbc5Mc",
  authDomain: "mycleanjcu.firebaseapp.com",
  projectId: "mycleanjcu",
  storageBucket: "mycleanjcu.firebaseapp.com",
  messagingSenderId: "137404600804",
  appId: "1:137404600804:web:e2bd6b28fe6d9b7cb637f1"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);
const messaging = getMessaging(app);

const VAPID_KEY = "BDUIz_uBYrL6sgMb2igVA0mkc7VAmH2qaJexVTQjz2MbhLf8brSMVlbWBTnlvXyvBACYXwCXPwbhOG5I98Rc3g8";

export { app, db, auth, messaging, VAPID_KEY };
