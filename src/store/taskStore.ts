import { create } from "zustand";
import { ITask } from "../models/task";

interface IState {
  tasks: ITask[];
}

interface IAction {
  setTasks: (tasks: ITask[]) => void;
  addTask: (task: ITask) => void;
  updateTask: (taskId: string, updatedTask: Partial<ITask>) => void;
  deleteTask: (taskId: string) => void;
}

const defaultTaskState: IState = {
  tasks: [],
};

export const useTaskStore = create<IState & IAction>((set) => ({
  ...defaultTaskState,
  setTasks: (tasks) =>
    set({ tasks: tasks.sort((a, b) => a.created_at - b.created_at) }),
  addTask: (task) => set(({ tasks }) => ({ tasks: [...tasks, task] })),
  updateTask: (taskId, updatedTask) =>
    set(({ tasks }) => ({
      tasks: tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, ...updatedTask };
        }

        return task;
      }),
    })),
  deleteTask: (taskId) =>
    set(({ tasks }) => ({ tasks: tasks.filter((task) => task.id !== taskId) })),
}));
