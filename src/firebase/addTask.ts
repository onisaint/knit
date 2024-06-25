import { getAuth } from "firebase/auth/web-extension";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { TASK_STATUS } from "../consts/status";
import { APP_ERRORS } from "../consts/defaults";
import { ITask } from "../models/task";

export const db_addTask = async (task: string, description = "") => {
  if (!task || task.length < 3) {
    throw new Error("A task is required");
  }

  try {
    const auth = getAuth();

    if (!auth.currentUser?.uid) {
      throw new Error(APP_ERRORS.need_auth);
    }

    const db = getFirestore();

    const newTask: Omit<ITask, "id"> = {
      task,
      description,
      status: TASK_STATUS.TODO,
      uid: auth.currentUser.uid,
      created_at: Date.now(),
    };

    const { id } = await addDoc(collection(db, "tasks"), newTask);

    return { ...newTask, id };
  } catch (e) {
    throw new Error(APP_ERRORS.try_again);
  }
};
