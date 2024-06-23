import { FC } from "react";
import { AppContainer } from "../../components/AppContainer";
import { Logout } from "./logout";
import { TaskHeader } from "./header";
import { TaskList } from "./list";
import { useAuthStore } from "../../store/authStore";
import { _cx } from "../../utils/defaults";

export const TaskView: FC = () => {
  const {
    signout: { confirm },
  } = useAuthStore();

  return (
    <AppContainer>
      <div className={_cx(confirm && "opacity-50 transition-all")}>
        <TaskHeader />

        <div className="mt-8">
          <TaskList />
        </div>
      </div>

      <div className="mt-8 border-t-2">
        <Logout />
      </div>
    </AppContainer>
  );
};
