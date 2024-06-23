import { onAuthStateChanged, getAuth, User, signOut } from "firebase/auth";
import { NextOrObserver } from "firebase/auth/web-extension";

export const getUser = (cb: NextOrObserver<User>) => {
  const auth = getAuth();
  onAuthStateChanged(auth, cb);
};

export const signOutUser = async () => {
  const auth = getAuth();
  await signOut(auth);
};
