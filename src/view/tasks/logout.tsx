import { FC } from "react";
import { useAuthStore } from "../../store/authStore";
import { signOutUser } from "../../firebase/auth";

export const Logout: FC = () => {
  const { signout, confirmSignOut, destroy } = useAuthStore();

  const onSignOut = async () => {
    if (!signout.confirm) {
      confirmSignOut(true);
      return;
    }

    try {
      await signOutUser();
      destroy();
    } catch {
      // ignore this error and destroy user anyway
    }
  };

  const onCancelSignout = () => confirmSignOut(false);

  if (!signout.confirm) {
    return (
      <button className="mt-4 text-xs button" onClick={onSignOut}>
        <p>Close for today</p>
      </button>
    );
  }

  return (
    <div className="flex items-center mt-4">
      <button
        className="text-xs button button-close bg-gray-200"
        onClick={onSignOut}
      >
        <p>I am tired</p>
      </button>

      <span className="ml-4">・</span>

      <button className="ml-4 text-xs button" onClick={onCancelSignout}>
        <p>Nope! Still got to run</p>
      </button>
    </div>
  );
};
