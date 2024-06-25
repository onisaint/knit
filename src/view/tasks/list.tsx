import { FC, useMemo, useState } from "react";
import { TASK_STATUS } from "../../consts/status";
import { _cx } from "../../utils/defaults";

import "./index.css";
import { useTaskStore } from "../../store/taskStore";
import { ITask } from "../../models/task";
import { SingleTask } from "./singleTask";
import { AddNewTask } from "./addNewTask";
import { useAppStore } from "../../store/appStore";

const EMPTY_MESSAGE: Record<TASK_STATUS, string> = {
  todo: "No tasks are to be done.",
  "in-progress": "No tasks are in progress. Move a task from todo list",
  done: "No tasks are done yet!",
};

const EMPTY_SEARCH_MESSAGE: Record<TASK_STATUS, string> = {
  todo: "Nothing found here",
  "in-progress": "Nothing found here",
  done: "Nothing found here",
};

export const TaskList: FC = () => {
  const { tasks } = useTaskStore();
  const { search } = useAppStore();

  const [hiddenTabs, setHiddenTabs] = useState<TASK_STATUS[]>([]);

  const toggleHiddenTab = (tab: TASK_STATUS) => () =>
    setHiddenTabs((tabs) => {
      if (tabs.includes(tab)) {
        return tabs.filter((t) => t !== tab);
      }

      return [...tabs, tab];
    });

  const onHideTab = (tab: TASK_STATUS) =>
    setHiddenTabs((tabs) => {
      return [...tabs, tab];
    });

  const taskTypes: Record<TASK_STATUS, ITask[]> = useMemo(() => {
    let _tasks = tasks;
    if (search !== "") {
      const _search = search.toLowerCase();
      _tasks = tasks.filter(
        (task) =>
          task.description?.toLowerCase().includes(_search) ||
          task.task.toLowerCase().includes(_search),
      );
    }

    const taskRecord = _tasks.reduce(
      (taskList, task) => {
        if (taskList[task.status]) {
          taskList[task.status].push(task);
        } else {
          taskList[task.status] = [task];
        }

        return taskList;
      },
      { todo: [], "in-progress": [], done: [] } as Record<TASK_STATUS, ITask[]>,
    );

    if (search === "" && taskRecord["in-progress"].length === 0) {
      onHideTab(TASK_STATUS.INPROGRESS);
    }

    if (search === "" && taskRecord["done"].length === 0) {
      onHideTab(TASK_STATUS.DONE);
    }

    return taskRecord;
  }, [tasks, search]);

  return (
    <div>
      {Object.entries(taskTypes).map(([type]) => {
        const isHidden = hiddenTabs.includes(type as TASK_STATUS);

        return (
          <div
            key={type}
            className={_cx(["mb-8 task_list transition-opacity", type])}
          >
            <div className="header flex items-center justify-between">
              <p
                className={_cx("capitalize", {
                  "opacity-50": isHidden,
                })}
              >
                {taskTypes[type as TASK_STATUS].length} - {type}
              </p>
              <button
                className="button text-sm text-gray-500 !px-2 !py-0"
                onClick={toggleHiddenTab(type as TASK_STATUS)}
              >
                {isHidden ? "Show" : "Hide"}
              </button>
            </div>

            {isHidden && (
              <div className="body transition-opacity opacity-50 empty" />
            )}

            {!isHidden && (
              <div
                className={_cx(
                  "body",
                  [isHidden && "transition-opacity opacity-50"],
                  { empty: isHidden },
                )}
              >
                {(type as TASK_STATUS) !== TASK_STATUS.TODO &&
                  taskTypes[type as TASK_STATUS].length === 0 && (
                    <p className="p-1 text-sm text-gray-400">
                      {
                        (search === "" ? EMPTY_MESSAGE : EMPTY_SEARCH_MESSAGE)[
                          type as TASK_STATUS
                        ]
                      }
                    </p>
                  )}
                {taskTypes[type as TASK_STATUS].map((task) => (
                  <SingleTask key={task.id} task={task} />
                ))}

                {type === TASK_STATUS.TODO && (
                  <div className="mt-2 p-1">
                    <AddNewTask />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
