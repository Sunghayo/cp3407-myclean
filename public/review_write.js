import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { app } from "/firebase.js";

const auth = getAuth(app);
const db = getFirestore(app);

const messageDiv = document.getElementById("message");
const bookingSelect = document.getElementById("bookingSelect");
const form = document.getElementById("reviewForm");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Please sign in to leave a review.");
    window.location.href = "login.html";
    return;
  }

  const q = query(
    collection(db, "bookings"),
    where("userId", "==", user.uid),
    where("status", "==", "completed")
  );

  const snapshot = await getDocs(q);
  bookingSelect.innerHTML = "";

  if (snapshot.empty) {
    const opt = document.createElement("option");
    opt.textContent = "No completed bookings found.";
    opt.disabled = true;
    bookingSelect.appendChild(opt);
    bookingSelect.disabled = true;
    return;
  }

  snapshot.forEach(doc => {
    const data = doc.data();
    const option = document.createElement("option");
    option.value = doc.id;
    option.textContent = `${data.service} (${data.date} ${data.time})`;
    bookingSelect.appendChild(option);
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const bookingId = bookingSelect.value;
  const rating = parseInt(document.getElementById("rating").value);
  const content = document.getElementById("content").value.trim();

  if (!bookingId || !rating || !content) [
    alert("Please complete all fields.");
    return;
}

  const user = auth.currentUser;
  const review = {
    userId: user.uid,
    bookingId,
    rating,
    content,
    createdAt: serverTimestamp()
  };

  try {
    await addDoc(collection(db, "reviews"), review);
    messageDiv.style.color = "green";
    messageDiv.textContent = "✅ Review submitted successfully!";
    form.reset();

    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  } catch (err) {
    console.error("Review submission failed:", err);
    messageDiv.style.color = "red";
    messageDiv.textContent = "Failed to submit review.";
  }
});
