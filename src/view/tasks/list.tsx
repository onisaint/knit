import { FC } from "react";
import { TASK_STATUS } from "../../consts/status";
import { _cx } from "../../utils/defaults";

import "./index.css";

export const TaskList: FC = () => {
  const taskTypes: Record<TASK_STATUS, number> = {
    "in-progress": 0,
    done: 0,
    todo: 0,
  };

  return (
    <div>
      {Object.entries(taskTypes).map(([type]) => {
        return (
          <div key={type} className={_cx(["mb-8", "task_list", type])}>
            <p className="capitalize">{type}</p>
            <div></div>
          </div>
        );
      })}
    </div>
  );
};
