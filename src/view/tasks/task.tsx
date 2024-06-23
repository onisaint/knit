import { FC } from "react";

export const Task: FC = () => {
  return (
    <div className="flex">
      <form>
        <div>
          <input className="input" placeholder="Name" />
        </div>
        <div>
          <textarea className="input" placeholder="description" />
        </div>
      </form>
    </div>
  );
};
