import { getAuth } from "firebase/auth/web-extension";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { APP_ERRORS } from "../consts/defaults";
import { ITask } from "../models/task";

export const db_updateTask = async (taskId: string, task: Partial<ITask>) => {
  if (!taskId || taskId.length < 3) {
    throw new Error("A task is required");
  }

  try {
    const auth = getAuth();

    if (!auth.currentUser?.uid) {
      throw new Error(APP_ERRORS.need_auth);
    }

    const db = getFirestore();
    const taskRef = doc(db, "tasks", taskId);

    await updateDoc(taskRef, task);

    return { id: taskRef.id, ...task };
  } catch (e) {
    throw new Error(APP_ERRORS.try_again);
  }
};
