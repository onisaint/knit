import { FC, useState } from "react";
import { ITask } from "../../models/task";
import { _cx } from "../../utils/defaults";
import { useForm } from "react-hook-form";
import { useFormError } from "../../hooks/defaults";
import { db_updateTask } from "../../firebase/updateTask";
import { useTaskStore } from "../../store/taskStore";
import { Spinner } from "../../components/Spinner";

type TTaskForm = Pick<ITask, "task" | "description">;

export const EditTask: FC<{ task: ITask; cancelEdit: () => void }> = ({
  cancelEdit,
  task,
}) => {
  const { register, handleSubmit } = useForm<TTaskForm>({
    defaultValues: { task: task.task, description: task.description },
  });
  const { updateTask } = useTaskStore();

  const [errors, setErrors] = useFormError<TTaskForm>();
  const [isBusy, setIsBusy] = useState(false);

  const onUpdateTask = async ({ task: taskName, description }: TTaskForm) => {
    const _errors: typeof errors = {};

    if (taskName.length < 3) {
      _errors.task = "Task name should be more than 3 characters";
    }

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors);
      return;
    }

    setIsBusy(true);
    try {
      const modifiedTask = { ...task, task: taskName, description };
      await db_updateTask(task.id, modifiedTask);
      updateTask(task.id, modifiedTask);
      setIsBusy(false);
      cancelEdit();
    } catch (e) {
      setErrors({ network: "Unable to save. Try again!" });
      setIsBusy(false);
    }
  };

  return (
    <div>
      <form className="px-1" onSubmit={handleSubmit(onUpdateTask)}>
        <div>
          <input
            className="input w-full"
            placeholder="What to do"
            autoFocus
            required
            {...register("task")}
          />
        </div>
        <div className="mt-2">
          <textarea
            className="input text-xs"
            placeholder="The plan"
            {...register("description")}
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>{errors?.network && <small>❌ {errors.network} </small>}</div>
          <div className="flex items-center">
            {isBusy && (
              <div className="mr-2">
                <Spinner />
              </div>
            )}
            {!isBusy && (
              <>
                <button
                  type="submit"
                  className={_cx("text-sm pl-2 px-1")}
                  disabled={isBusy}
                >
                  Save
                </button>

                {!isBusy && (
                  <button
                    type="button"
                    className={_cx("text-sm pl-2 px-1")}
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
