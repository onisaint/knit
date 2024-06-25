import { FC, useEffect, useState } from "react";
import { ITask } from "../../models/task";
import { _cx } from "../../utils/defaults";
import { TASK_STATUS } from "../../consts/status";
import { useTaskStore } from "../../store/taskStore";
import { db_deleteTask } from "../../firebase/deleteTask";
import { useFormError } from "../../hooks/defaults";
import { Spinner } from "../../components/Spinner";
import { db_updateTask } from "../../firebase/updateTask";
import { EditTask } from "./editTask";

export const SingleTask: FC<{ task: ITask }> = ({ task }) => {
  const { deleteTask, updateTask } = useTaskStore();

  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [errors, setErrors] = useFormError();
  const [isBusy, setIsBusy] = useState(false);

  const onCancelDelete = () => setConfirmDelete(false);
  const onDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => {
        setConfirmDelete(false);
      }, 2500);
      return;
    }

    setIsBusy(true);
    try {
      await db_deleteTask(task.id);
      deleteTask(task.id);
      setIsBusy(false);
    } catch (e) {
      setErrors({ network: "Unable to delete. Try again!" });
      setIsBusy(false);
    }
  };

  const onUpdateTask = async (modifiedTask: Partial<ITask> = task) => {
    setIsBusy(true);
    try {
      await db_updateTask(task.id, modifiedTask);
      updateTask(task.id, modifiedTask);
      setIsBusy(false);
    } catch (e) {
      setErrors({ network: "Unable to save. Try again!" });
      setIsBusy(false);
    }
  };

  const onMarkInProgress = () =>
    onUpdateTask({ ...task, status: TASK_STATUS.INPROGRESS });
  const onMarkAsTodo = () =>
    onUpdateTask({ ...task, status: TASK_STATUS.TODO });
  const onMarkAsDone = () =>
    onUpdateTask({ ...task, status: TASK_STATUS.DONE });

  const onToggleEdit = () => setIsEditing(!isEditing);
  const onCancelEdit = () => setIsEditing(false);

  if (isEditing) {
    return (
      <div className="py-1 border border-gray-400 mb-4">
        <EditTask task={task} cancelEdit={onCancelEdit} />
      </div>
    );
  }

  return (
    <div className="py-1 border border-transparent hover:border-gray-400 border-b mb-4">
      <div
        className={_cx("px-1 transition-opacity", {
          "opacity-50": confirmDelete,
        })}
      >
        <div className="flex items-center justify-between">
          <p className="text-gray-600">{task.task}</p>
          <div style={{ width: 25 }}>{isBusy && <Spinner />}</div>
        </div>
        <p className="text-xs text-gray-400">{task.description}</p>
      </div>

      {errors?.network && <small>❌ {errors.network}</small>}

      <div className="mt-4 px-1">
        <small
          className={_cx("transition-opacity", {
            "opacity-50": confirmDelete,
          })}
        >
          Actions
        </small>
        <div className="flex items-center justify-between ">
          <div
            className={_cx("flex items-center transition-opacity", {
              "opacity-50": confirmDelete,
            })}
          >
            {task.status === TASK_STATUS.TODO && (
              <button
                className="text-sm button-to-progress pl-2 px-1"
                onClick={onMarkInProgress}
                disabled={isBusy}
              >
                Move to in-progress
              </button>
            )}

            {task.status === TASK_STATUS.INPROGRESS && (
              <div className="flex items-center ">
                <button
                  className="text-sm button-to-done pl-2 px-1"
                  onClick={onMarkAsDone}
                  disabled={isBusy}
                >
                  Mark as Done
                </button>
                <button
                  className="text-sm ml-4 button-to-todo pl-2 px-1"
                  onClick={onMarkAsTodo}
                  disabled={isBusy}
                >
                  Move back to Todo
                </button>
              </div>
            )}

            {task.status === TASK_STATUS.DONE && (
              <button
                className="text-sm button-to-progress pl-2 px-1"
                onClick={onMarkInProgress}
                disabled={isBusy}
              >
                Move back to in-progress
              </button>
            )}
          </div>

          <div className="flex items-center">
            {!confirmDelete && (
              <button
                className={_cx("text-sm pl-2 px-1")}
                onClick={onToggleEdit}
                disabled={isBusy}
              >
                Edit
              </button>
            )}

            <div className={_cx("border-state-danger flex items-center")}>
              <button
                className={_cx("text-sm pl-2 px-1", {
                  "button-delete": confirmDelete,
                })}
                onClick={onDelete}
                disabled={isBusy}
              >
                {confirmDelete ? "Confirm delete" : "Delete"}
              </button>

              {confirmDelete && (
                <button
                  className="text-sm ml-4 px-1"
                  onClick={onCancelDelete}
                  disabled={isBusy}
                >
                  Nope!
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
