import { useEffect, useState, useCallback } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

/**
 * সব পণ্য একটা শেয়ার করা "products" কালেকশনে থাকে, প্রতিটা পণ্যে
 * ownerId (কে যোগ করেছে) লেখা থাকে। onSnapshot ব্যবহার করায়
 * কেউ নতুন পণ্য যোগ করলেই সব ব্যবহারকারীর স্ক্রিনে সাথে সাথে দেখা যায় —
 * পেজ রিলোড করার দরকার নেই।
 */
export function useProducts(uid) {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setAllProducts([]);
      setLoading(false);
      return;
    }
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setAllProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load products:", err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [uid]);

  const addProduct = useCallback(
    async ({ name, price }) => {
      if (!uid) return;
      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        ownerId: uid,
        createdAt: serverTimestamp(),
      });
    },
    [uid]
  );

  const myProducts = allProducts.filter((p) => p.ownerId === uid);

  return { allProducts, myProducts, loading, addProduct };
}
