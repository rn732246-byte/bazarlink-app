import { useEffect, useState } from "react";
import { watchAuth, signOutUser, connectGoogleAccount } from "../lib/firebase";

export function useAuthUser() {
  const [uid, setUid] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = watchAuth((user) => {
      setUid(user ? user.uid : null);
      setIsAnonymous(user ? user.isAnonymous : true);
      setReady(true);
    });
    return unsubscribe;
  }, []);

  return { uid, isAnonymous, ready, signOut: signOutUser, connectGoogle: connectGoogleAccount };
}
