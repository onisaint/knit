import { TASK_STATUS } from "../consts/status";

export interface ITask {
  id: string;
  task: string;
  description?: string;
  status: TASK_STATUS;
  uid: string;
  created_at: number;
}
