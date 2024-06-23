import { create } from "zustand";

interface IState {
  id: string;
  name: string;
  email: string;
  /** ask for signout confirmation */
  signout: {
    confirm: boolean;
  };
}

interface IAction {
  setUser: (state: Pick<IState, "id" | "name" | "email">) => void;
  destroy: () => void;
  confirmSignOut: (confirm: boolean) => void;
}

const defaultAuthState: IState = {
  id: "",
  name: "",
  email: "",
  signout: {
    confirm: false,
  },
};

export const useAuthStore = create<IState & IAction>((set) => ({
  ...defaultAuthState,
  setUser: ({ id, name, email }) => set(() => ({ id, name, email })),
  confirmSignOut: (confirm) => set(() => ({ signout: { confirm } })),
  destroy: () => set(() => defaultAuthState),
}));
