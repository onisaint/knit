import { getAuth } from "firebase/auth/web-extension";
import { APP_ERRORS } from "../consts/defaults";
import {
  getDocs,
  collection,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { ITask } from "../models/task";

export const db_getTasks = async () => {
  try {
    const auth = getAuth();

    if (!auth.currentUser?.uid) {
      throw new Error(APP_ERRORS.need_auth);
    }

    const db = getFirestore();
    const q = query(
      collection(db, "tasks"),
      where("uid", "==", auth.currentUser.uid),
    );
    const tasksSnapshot = await getDocs(q);
    const tasks: ITask[] = tasksSnapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<ITask, "id">),
    }));
    return tasks;
  } catch (e) {
    return [];
  }
};
