import { create } from "zustand";

interface IState {
  search: string;
}

interface IAction {
  setSearch: (search: string) => void;
}

const defaultAppState: IState = {
  search: "",
};

export const useAppStore = create<IState & IAction>((set) => ({
  ...defaultAppState,
  setSearch: (search) => {
    set({ search });
  },
}));
