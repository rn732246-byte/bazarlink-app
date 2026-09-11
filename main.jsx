import React from "react";
import ReactDOM from "react-dom/client";
import BazarlinkPrototype from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BazarlinkPrototype />
  </React.StrictMode>
);

// অ্যাপটাকে "Add to Home Screen" দিয়ে ইনস্টলযোগ্য করার জন্য সার্ভিস ওয়ার্কার চালু করা হচ্ছে
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.error("Service worker registration failed:", err);
    });
  });
}

