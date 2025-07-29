import { db } from "./firebase.js";
import { collection, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const reviewList = document.getElementById("reviewList");

async function loadReviews() {
  const q = query(collection(db, "reviews"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);

  reviewList.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    const div = document.createElement("div");
    div.className = "review";
    div.innerHTML = `
      <h3>${data.name} - ${data.serviceType}</h3>
      <div><span>${"⭐".repeat(data.rating)}</span></div>
      <p>${data.content}</p>
    `;
    reviewList.appendChild(div);
  });
}

loadReviews();
