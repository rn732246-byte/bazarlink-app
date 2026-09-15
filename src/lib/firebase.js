import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  linkWithPopup,
  signInWithCredential,
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
const googleProvider = new GoogleAuthProvider();

/**
 * কোনো ফোন নম্বর/OTP ছাড়াই প্রতিটা ব্যবহারকারীকে একটা পরিচয় (uid) দেয়।
 * অ্যাপ খোলার সাথে সাথেই স্বয়ংক্রিয়ভাবে সাইন-ইন হয়ে যায়।
 * সীমাবদ্ধতা: এই পরিচয় শুধু এই ব্রাউজার/ডিভাইসেই থাকে, যতক্ষণ না
 * নিচের connectGoogleAccount() দিয়ে Google-এর সাথে সংযুক্ত করা হয়।
 */
export function watchAuth(callback) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({ uid: user.uid, isAnonymous: user.isAnonymous });
    } else {
      signInAnonymously(auth).catch((err) => {
        console.error("Anonymous sign-in failed:", err);
        callback(null);
      });
    }
  });
}

/**
 * বর্তমান (anonymous) পরিচয়কে একটা Google অ্যাকাউন্টের সাথে সংযুক্ত করে —
 * uid বদলায় না, তাই এই ডিভাইসের সব ডেটা (প্রোফাইল/পণ্য/অর্ডার) থেকে যায়।
 *
 * অন্য কোনো ডিভাইসে যদি এই একই Google অ্যাকাউন্ট আগে থেকেই অন্য একটা
 * পরিচয়ের সাথে সংযুক্ত থাকে (অর্থাৎ এই ব্যবহারকারী আগে অন্য ডিভাইস থেকে
 * Google দিয়ে সংযুক্ত করেছিলেন), তাহলে Firebase একটা
 * "credential-already-in-use" এরর দেয় — তখন স্বয়ংক্রিয়ভাবে সেই পুরনো
 * পরিচয়েই সাইন-ইন করিয়ে দেওয়া হয়, ফলে আগের প্রোফাইল-পণ্য-অর্ডার সব
 * ফিরে পাওয়া যায়।
 */
export async function connectGoogleAccount() {
  try {
    const result = await linkWithPopup(auth.currentUser, googleProvider);
    return { switchedToExisting: false, uid: result.user.uid };
  } catch (err) {
    if (err.code === "auth/credential-already-in-use") {
      const credential = GoogleAuthProvider.credentialFromError(err);
      const result = await signInWithCredential(auth, credential);
      return { switchedToExisting: true, uid: result.user.uid };
    }
    throw err;
  }
}

export async function signOutUser() {
  await firebaseSignOut(auth);
}
