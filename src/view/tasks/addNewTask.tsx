import { useFormError } from "../../hooks/defaults";
import { useForm } from "react-hook-form";
import { Spinner } from "../../components/Spinner";
import { db_addTask } from "../../firebase/addTask";
import { useState } from "react";
import { useTaskStore } from "../../store/taskStore";

interface INewTask {
  task: string;
  description: string;
}

export const AddNewTask = () => {
  const { register, handleSubmit, reset } = useForm<INewTask>();
  const { addTask } = useTaskStore();

  const [isAddNewShown, showAddNew] = useState(false);

  const [errors, setErrors] = useFormError<INewTask>();
  const [isBusy, setIsBusy] = useState(false);

  const toggleAddNew = () => {
    reset({ task: "", description: "" });
    showAddNew(!isAddNewShown);
  };

  const onCreateNewTask = async ({ task, description }: INewTask) => {
    const _errors: typeof errors = {};

    if (task.length < 3) {
      _errors.task = "Task name should be more than 3 characters";
    }

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors);
      return;
    }

    setIsBusy(true);
    try {
      const newTask = await db_addTask(task, description);
      addTask(newTask);

      setIsBusy(false);
      toggleAddNew();
      showAddNew(false);
    } catch (e) {
      setErrors({ network: (e as Error).message });
      setIsBusy(false);
    }
  };

  if (!isAddNewShown) {
    return (
      <button
        className="text-sm text-gray-600 hover:text-gray-800"
        onClick={toggleAddNew}
      >
        Add new task
      </button>
    );
  }

  return (
    <div className="border p-2">
      <p className="text-sm text-gray-400 mb-4">Add new task</p>

      <div className="w-full">
        <form onSubmit={handleSubmit(onCreateNewTask)}>
          <div>
            <input
              className="input w-full text-sm"
              placeholder="What to do"
              autoFocus
              required
              {...register("task")}
            />
          </div>
          <div className="mt-2">
            <textarea
              className="input text-sm"
              placeholder="The plan"
              {...register("description")}
            />
          </div>

          <div className="flex items-center">
            <button
              type="submit"
              className="text-sm button mt-4 !py-1 bg-gray-200 flex items-center"
              disabled={isBusy}
            >
              Add new task
            </button>
            {!isBusy && (
              <button
                type="button"
                className="text-sm button mt-4 !py-1"
                onClick={toggleAddNew}
              >
                Cancel
              </button>
            )}
            {isBusy && (
              <div className="ml-4 mt-4">
                <Spinner />
              </div>
            )}
          </div>
        </form>
        {errors?.network && <small>❌{errors.network}</small>}
      </div>
    </div>
  );
};
