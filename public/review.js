import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnusZ7fck0nU_b0iDZAbAUyliQ0Dbc5Mc",
  authDomain: "mycleanjcu.firebaseapp.com",
  projectId: "mycleanjcu",
  storageBucket: "mycleanjcu.appspot.com",
  messagingSenderId: "137404600804",
  appId: "1:137404600804:web:e2bd6b28fe6d9b7cb637f1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const reviewsDiv = document.getElementById("reviews");

async function loadReviews() {
  try {
    const snapshot = await getDocs(collection(db, "reviews"));
    if (snapshot.empty) {
      reviewsDiv.innerHTML = "<p>No reviews found.</p>";
      return;
    }

    reviewsDiv.innerHTML = "";

    for (const docSnap of snapshot.docs) {
      const review = docSnap.data();

      let bookingInfo = "Service Unknown";
      try {
        const bookingRef = doc(db, "bookings", review.bookingId);
        const bookingSnap = await getDoc(bookingRef);
        if (bookingSnap.exists()) {
          const data = bookingSnap.data();
          bookingInfo = data.service;
        }
      } catch {}

      const stars = "⭐".repeat(review.rating || 0);
      const createdAt = review.createdAt?.toDate?.().toLocaleString() || "";

      const reviewEl = document.createElement("div");
      reviewEl.className = "review";
      reviewEl.innerHTML = `
        <div class="stars">${stars}</div>
        <p>${review.content}</p>
        <small>
          Service: ${bookingInfo}<br>
          User: ${review.userId.slice(0, 6)}****<br>
          Date: ${createdAt}
        </small>
      `;
      reviewsDiv.appendChild(reviewEl);
    }

  } catch (error) {
    console.error("Error loading reviews:", error);
    reviewsDiv.innerHTML = "<p style='color:red;'>Failed to load reviews.</p>";
  }
}

loadReviews();
