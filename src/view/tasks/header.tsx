import { FC } from "react";
import { useAuthStore } from "../../store/authStore";
import { TASK_STATUS } from "../../consts/status";

import "./index.css";
import { _cx } from "../../utils/defaults";

export const TaskHeader: FC = () => {
  const { name } = useAuthStore((state) => state);

  const taskList: Record<TASK_STATUS, number> = {
    "in-progress": 0,
    done: 0,
    todo: 0,
  };

  return (
    <div>
      <p className="text-sm text-gray-600 font-sans">Hello, {name}!</p>
      <div className="flex items-center mt-1">
        <p>You have </p>
        {Object.entries(taskList).map(([type, count]) => {
          return (
            <button
              key={type}
              className={_cx(["ml-2 px-2", "status_button", type])}
            >
              <p>
                {count} <span className="capitalize">{type}</span>
              </p>
            </button>
          );
        })}
        <p className="ml-2">in your inbox</p>
      </div>
    </div>
  );
};
