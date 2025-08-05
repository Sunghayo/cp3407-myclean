<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Write a Review - MyClean</title>
  <script type="module" src="/firebase.js"></script>
  <script type="module" src="/review_write.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 30px;
    }
    label {
      display: block;
      margin-top: 15px;
    }
    select, textarea, input[type="text"], button {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
    }
    button {
      background-color: #2563eb;
      color: white;
      font-weight: bold;
      border: none;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <h1>Write a Review</h1>

  <form id="reviewForm">
    <label for="bookingSelect">Select Completed Booking</label>
    <select id="bookingSelect" required>
      <option value="">Loading your bookings...</option>
    </select>

    <label for="rating">Rating (1–5 stars)</label>
    <select id="rating" required>
      <option value="">Select rating</option>
      <option value="1">⭐</option>
      <option value="2">⭐⭐</option>
      <option value="3">⭐⭐⭐</option>
      <option value="4">⭐⭐⭐⭐</option>
      <option value="5">⭐⭐⭐⭐⭐</option>
    </select>

    <label for="content">Review</label>
    <textarea id="content" rows="5" placeholder="Write your review here..." required></textarea>

    <button type="submit">Submit Review</button>
  </form>
</body>
</html>
