import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from "./firebase.js";

await setDoc(doc(db, "users", user.uid), {
  email: user.email,
  role: "cleaner",
  createdAt: new Date()
});
