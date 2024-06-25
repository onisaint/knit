import { FC, useEffect, useState } from "react";
import { RegisterView } from "./view/auth/registerView";
import { getUser } from "./firebase/auth";
import { AppLoaderView } from "./components/AppLoader";
import { TaskView } from "./view/tasks/taskView";
import { useAuthStore } from "./store/authStore";
import { db_getTasks } from "./firebase/getTasks";
import { useTaskStore } from "./store/taskStore";

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { setUser, destroy } = useAuthStore();
  const { setTasks } = useTaskStore();

  useEffect(() => {
    getUser(async (user) => {
      setIsAuthenticated(!!user);
      if (user && user.displayName && user.email) {
        setUser({ id: user.uid, name: user.displayName, email: user.email });
        const tasks = await db_getTasks();
        setTasks(tasks);
        setIsLoading(false);
      } else {
        destroy();
        setIsLoading(false);
      }
    });
  }, [destroy, setUser, setTasks]);

  if (isLoading) {
    return <AppLoaderView />;
  }

  if (isAuthenticated) {
    return <TaskView />;
  }

  return <RegisterView />;
};

export default App;
