import { FC, useEffect, useState } from "react";
import { RegisterView } from "./view/auth/registerView";
import { getUser } from "./firebase/auth";
import { AppLoaderView } from "./components/AppLoader";
import { TaskView } from "./view/tasks/taskView";
import { useAuthStore } from "./store/authStore";

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { setUser, destroy } = useAuthStore();

  useEffect(() => {
    getUser((user) => {
      setIsAuthenticated(!!user);
      if (user && user.displayName && user.email) {
        setUser({ id: user.uid, name: user.displayName, email: user.email });
      } else {
        destroy();
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    });
  }, [destroy, setUser]);

  if (isLoading) {
    return <AppLoaderView />;
  }

  if (isAuthenticated) {
    return <TaskView />;
  }

  return <RegisterView />;
};

export default App;
