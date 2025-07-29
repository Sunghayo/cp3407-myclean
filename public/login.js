import { auth, db, messaging, VAPID_KEY } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getToken } from "firebase/messaging";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });

      if (token) {
        await setDoc(doc(db, "users", user.uid), {
          fcmToken: token
        }, { merge: true });

        console.log("FCM token saved:", token);
      } else {
        console.warn("Permission not granted for notifications.");
      }
    } catch (err) {
      console.error("FCM token error:", err);
    }
  }
});
