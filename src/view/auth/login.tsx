import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useFormError } from "../../hooks/defaults";
import { isEmail } from "validator";
import { APP_ERRORS } from "../../consts/defaults";
import { isPasswordOk } from "../../utils/validator";
import { db_loginUser } from "../../firebase/login";
import { Spinner } from "../../components/Spinner";

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginView: FC<{ toggleSignUp: () => void }> = ({
  toggleSignUp,
}) => {
  const { register, handleSubmit } = useForm<ILoginForm>();

  const [isBusy, setBusy] = useState(false);
  const [errors, setErrors] = useFormError<ILoginForm>();

  const onLogin = async ({ email, password }: ILoginForm) => {
    const _errors: typeof errors = {};
    if (!isEmail(email)) {
      _errors.email = "Email is not valid";
    }

    if (!isPasswordOk(password)) {
      _errors.password = APP_ERRORS.weak_password;
    }

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors);
      return;
    }

    setBusy(true);
    try {
      await db_loginUser(email, password);
      setBusy(false);
    } catch (e: unknown) {
      setErrors({ network: (e as Error).message });
      setBusy(false);
    }
  };

  return (
    <div>
      <h4 className="text-lg text-gray-800 font-sans">Welcome back</h4>

      <form className="mt-6" onSubmit={handleSubmit(onLogin)}>
        <div className="mt-4">
          <label htmlFor="login-email" className="block text-sm text-gray-600">
            Email
          </label>
          <input
            className="input"
            id="login-email"
            type="email"
            autoComplete="off"
            placeholder="e-mail address"
            required
            {...register("email")}
          />
          {errors?.email && <small>❌ {errors.email}</small>}
        </div>
        <div className="mt-4">
          <label
            htmlFor="login-passowrd"
            className="block text-sm text-gray-600"
          >
            Password
          </label>
          <input
            className="input"
            id="login-password"
            type="password"
            placeholder="secure password"
            required
            {...register("password")}
          />
          {errors?.password && <small>❌ {errors.password}</small>}
        </div>

        <div className="flex items-center">
          <button
            type="submit"
            className="button border border-gray-600 mt-8"
            disabled={isBusy}
          >
            Login
          </button>
          {isBusy && (
            <div className="ml-4 mt-8">
              <Spinner />
            </div>
          )}
        </div>
      </form>

      {errors?.network && <small>❌ {errors.network}</small>}

      <button
        className="cursor-pointer mt-16 block button-transparent"
        onClick={toggleSignUp}
      >
        <p className="text-sm">
          New here? <span className="text-link">Create new account</span>
        </p>
      </button>
    </div>
  );
};
