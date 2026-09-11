import { useEffect, useState, useCallback } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

/**
 * প্রতিটা ব্যবহারকারীর প্রোফাইল/ভেরিফিকেশন ফর্ম "profiles/{uid}"-এ জমা থাকে।
 * অ্যাপ বন্ধ করে আবার খুললেও এই তথ্য মনে থাকবে।
 */
export function useProfile(uid) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    let cancelled = false;
    setLoading(true);
    getDoc(doc(db, "profiles", uid))
      .then((snap) => {
        if (cancelled) return;
        setProfile(snap.exists() ? snap.data() : null);
      })
      .catch((err) => console.error("Failed to load profile:", err))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [uid]);

  const saveProfile = useCallback(
    async (data) => {
      if (!uid) return;
      const next = { ...profile, ...data, updatedAt: serverTimestamp() };
      await setDoc(doc(db, "profiles", uid), next, { merge: true });
      setProfile((prev) => ({ ...prev, ...data }));
    },
    [uid, profile]
  );

  return { profile, loading, saveProfile };
}
