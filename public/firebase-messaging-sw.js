importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDnusZ7fck0nU_b0iDZAbAUyliQ0Dbc5Mc",
  authDomain: "mycleanjcu.firebaseapp.com",
  projectId: "mycleanjcu",
  storageBucket: "mycleanjcu.firebaseapp.com",
  messagingSenderId: "137404600804",
  appId: "1:137404600804:web:e2bd6b28fe6d9b7cb637f1"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📦 Background message received: ", payload);

  const { title, body } = payload.notification;

  self.registration.showNotification(title, {
    body,
    icon: "/icon.png" 
  });
});
