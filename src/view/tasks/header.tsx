import { ChangeEventHandler, FC, useState } from "react";
import { useAuthStore } from "../../store/authStore";

import "./index.css";
import { useAppStore } from "../../store/appStore";
import { useDebounce } from "../../utils/useDebounce";

export const TaskHeader: FC = () => {
  const { name } = useAuthStore((state) => state);
  const { setSearch } = useAppStore();

  const [search, setLocalSearch] = useState("");

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => setLocalSearch(value);

  useDebounce(
    () => {
      setSearch(search);
    },
    700,
    [search],
  );

  return (
    <div>
      <p className="text-gray-600 font-sans">Hello, {name}!</p>
      <input
        value={search}
        onChange={onSearchChange}
        className="px-2 text input border border-gray-300 focus:border-gray-400"
        placeholder="Search a task"
      />
    </div>
  );
};
