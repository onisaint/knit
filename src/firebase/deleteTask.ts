import { getAuth } from "firebase/auth/web-extension";
import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import { APP_ERRORS } from "../consts/defaults";

export const db_deleteTask = async (taskId: string) => {
  if (!taskId || taskId.length < 3) {
    throw new Error("A task is required");
  }

  try {
    const auth = getAuth();

    if (!auth.currentUser?.uid) {
      throw new Error(APP_ERRORS.need_auth);
    }

    const db = getFirestore();

    await deleteDoc(doc(db, "tasks", taskId));
  } catch (e) {
    throw new Error(APP_ERRORS.try_again);
  }
};
