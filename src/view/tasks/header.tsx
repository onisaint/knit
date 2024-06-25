import { FC } from "react";
import { useAuthStore } from "../../store/authStore";

import "./index.css";

export const TaskHeader: FC = () => {
  const { name } = useAuthStore((state) => state);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-gray-600 font-sans">Hello, {name}!</p>
      </div>
    </div>
  );
};
