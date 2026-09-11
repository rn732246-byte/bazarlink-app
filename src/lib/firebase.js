import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// এই মানগুলো .env ফাইল থেকে আসে (নিচে .env.example দেখুন)।
// Firebase কনসোল থেকে আপনার প্রজেক্টের কনফিগ কপি করে .env ফাইলে বসান।
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/**
 * বর্তমান লগইন অবস্থা শোনে। ফোন-নম্বর দিয়ে লগইন করা থাকলে uid পাঠাবে,
 * নাহলে null পাঠাবে (তখন লগইন স্ক্রিন দেখানো হবে)।
 */
export function watchAuth(callback) {
  return onAuthStateChanged(auth, (user) => {
    callback(user ? user.uid : null);
  });
}

/**
 * অদৃশ্য reCAPTCHA তৈরি করে — Firebase Phone Auth-এর জন্য এটা লাগবেই।
 * containerId হিসেবে DOM-এ একটা খালি div থাকতে হবে।
 */
export function setupRecaptcha(containerId) {
  if (!window.__recaptchaVerifier) {
    window.__recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
    });
  }
  return window.__recaptchaVerifier;
}

/**
 * ফোন নম্বরে OTP কোড পাঠায়। number অবশ্যই +880 সহ পূর্ণ ফরম্যাটে দিতে হবে
 * (যেমন +8801XXXXXXXXX)। রিটার্ন করে একটা confirmationResult, যেটা দিয়ে
 * পরের ধাপে কোড যাচাই করা হয়।
 */
export async function sendOtp(phoneNumber, containerId) {
  const verifier = setupRecaptcha(containerId);
  return signInWithPhoneNumber(auth, phoneNumber, verifier);
}

export async function signOutUser() {
  await firebaseSignOut(auth);
  window.__recaptchaVerifier = null;
}
