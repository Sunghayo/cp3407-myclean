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
const sortDropdown = document.getElementById("sortDropdown");

let reviewsData = [];

function renderReviews(data) {
  reviewsDiv.innerHTML = "";
  data.forEach(({ stars, content, service, userId, createdAt }) => {
    const reviewEl = document.createElement("div");
    reviewEl.className = "review";
    reviewEl.innerHTML = `
      <div class="stars">${stars}</div>
      <p>${content}</p>
      <small>
        Service: ${service}<br>
        User: ${userId.slice(0, 6)}****<br>
        Date: ${createdAt}
      </small>
    `;
    reviewsDiv.appendChild(reviewEl);
  });
}

async function loadReviews() {
  try {
    const snapshot = await getDocs(collection(db, "reviews"));
    if (snapshot.empty) {
      reviewsDiv.innerHTML = "<p>No reviews found.</p>";
      return;
    }

    const fetchedReviews = [];

    for (const docSnap of snapshot.docs) {
      const review = docSnap.data();

      let service = "Service Unknown";
      try {
        const bookingRef = doc(db, "bookings", review.bookingId);
        const bookingSnap = await getDoc(bookingRef);
        if (bookingSnap.exists()) {
          service = bookingSnap.data().service;
        }
      } catch {}

      const createdDate = review.createdAt?.toDate?.() || new Date();
      fetchedReviews.push({
        stars: "⭐".repeat(review.rating || 0),
        rating: review.rating || 0,
        content: review.content || "",
        service,
        userId: review.userId || "Unknown",
        createdAt: createdDate,
      });
    }
    
    reviewsData = fetchedReviews;
    sortAndRender("recent");

  } catch (error) {
    console.error("Error loading reviews:", error);
    reviewsDiv.innerHTML = "<p style='color:red;'>Failed to load reviews.</p>";
  }
}

function sortAndRender(mode) {
  const sorted = [...reviewsData];
  if (mode === "rating") {
    sorted.sort((a, b) => b.rating - a.rating);
  } else {
    sorted.sort((a, b) => b.createdAt - a.createdAt);
  }

  renderReviews(
    sorted.map(r => ({
      ...r,
      createdAt: r.createdAt.toLocaleString(),
    }))
  );
}

sortDropdown?.addEventListener("change", () => {
  const selected = sortDropdown.value;
  sortAndRender(selected);
});

loadReviews();
