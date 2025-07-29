import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

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

import { onMessage } from "firebase/messaging";

if (Notification.permission !== "granted") {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("🔔 Notification permission granted.");
    }
  });
}

onMessage(messaging, (payload) => {
  console.log("🔔 Foreground message received: ", payload);

  const { title, body } = payload.notification;
  new Notification(title, { body });
});
