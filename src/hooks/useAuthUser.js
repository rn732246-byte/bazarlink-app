import { useEffect, useState } from "react";
import { watchAuth, signOutUser } from "../lib/firebase";

export function useAuthUser() {
  const [uid, setUid] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = watchAuth((id) => {
      setUid(id);
      setReady(true);
    });
    return unsubscribe;
  }, []);

  return { uid, ready, signOut: signOutUser };
}
