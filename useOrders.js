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
 * প্রতিটা অর্ডার "orders" কালেকশনে জমা থাকে — কে কিনেছে (buyerId),
 * কোন কোন পণ্য, ঠিকানা ও মোট টাকা সহ। এভাবে দোকানদার অর্ডার করলে
 * পাইকারি তার ড্যাশবোর্ডে সেই অর্ডার দেখতে পাবে।
 */
export function useOrders(uid) {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setAllOrders([]);
      setLoading(false);
      return;
    }
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setAllOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load orders:", err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [uid]);

  const placeOrder = useCallback(
    async ({ items, address, total }) => {
      if (!uid) return;
      await addDoc(collection(db, "orders"), {
        buyerId: uid,
        items,
        address,
        total,
        status: "pending",
        createdAt: serverTimestamp(),
      });
    },
    [uid]
  );

  // এই ব্যবহারকারী নিজে যা কিনেছে
  const myOrders = allOrders.filter((o) => o.buyerId === uid);
  // এই ব্যবহারকারীর পণ্য নিয়ে অন্য কেউ যা অর্ডার করেছে (পাইকারির জন্য)
  const ordersForMyProducts = allOrders.filter((o) =>
    (o.items || []).some((item) => item.ownerId === uid)
  );

  return { allOrders, myOrders, ordersForMyProducts, loading, placeOrder };
}
