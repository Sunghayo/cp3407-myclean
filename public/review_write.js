import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { collection, query, where, getDocs, addDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const bookingSelect = document.getElementById("bookingSelect");
const form = document.getElementById("reviewForm");

let currentUser = null;
let bookings = [];

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", user.uid),
      where("status", "==", "Completed")
    );
    const snapshot = await getDocs(q);

    bookingSelect.innerHTML = "";
    bookings = [];

    snapshot.forEach((docSnap) => {
      const booking = docSnap.data();
      bookings.push({ id: docSnap.id, ...booking });

      const option = document.createElement("option");
      option.value = docSnap.id;
      option.textContent = `${booking.serviceType} on ${booking.date}`;
      bookingSelect.appendChild(option);
    });

    if (bookings.length === 0) {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "No completed bookings found.";
      bookingSelect.appendChild(option);
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const bookingId = bookingSelect.value;
  const rating = parseInt(document.getElementById("rating").value);
  const content = document.getElementById("content").value;

  if (!bookingId || !rating || !content) return;

  const booking = bookings.find(b => b.id === bookingId);
  const userRef = doc(db, "users", currentUser.uid);
  const userSnap = await getDoc(userRef);
  const name = userSnap.exists() ? userSnap.data().name : currentUser.email;

  await addDoc(collection(db, "reviews"), {
    userId: currentUser.uid,
    bookingId,
    serviceType: booking.serviceType,
    name,
    rating,
    content,
    timestamp: new Date()
  });

  alert("Review submitted!");
  form.reset();
});
