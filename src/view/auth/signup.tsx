import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useFormError } from "../../hooks/defaults";
import { isEmail } from "validator";
import { isPasswordOk } from "../../utils/validator";
import { APP_ERRORS } from "../../consts/defaults";
import { db_signUpUser } from "../../firebase/signup";
import { Spinner } from "../../components/Spinner";

interface ISignupForm {
  name: string;
  email: string;
  password: string;
}

export const SignupView: FC<{ toggleLogin: () => void }> = ({
  toggleLogin,
}) => {
  const { register, handleSubmit } = useForm<ISignupForm>();

  const [isBusy, setBusy] = useState(false);
  const [errors, setErrors] = useFormError<ISignupForm>();

  const onSignup = async ({ name, email, password }: ISignupForm) => {
    const _errors: typeof errors = {};

    if (name.length < 3) {
      _errors.name = "Display name should be bigger than 3 characters";
    }

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
      await db_signUpUser(name, email, password);
      setBusy(false);
    } catch (e) {
      setErrors({ network: (e as Error).message });
      setBusy(false);
    }
  };

  return (
    <div>
      <h4 className="text-lg text-gray-800 font-sans">Hello!</h4>

      <form className="mt-6" onSubmit={handleSubmit(onSignup)}>
        <div className="mt-4">
          <label htmlFor="signup-name" className="block text-sm text-gray-600">
            Name
          </label>
          <input
            className="input"
            id="signup-name"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Display name"
            required
            {...register("name")}
          />
          {errors?.name && <small>❌ {errors.name}</small>}
        </div>
        <div className="mt-4">
          <label htmlFor="signup-email" className="block text-sm text-gray-600">
            Email
          </label>
          <input
            className="input"
            id="signup-email"
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
            htmlFor="signup-passowrd"
            className="block text-sm text-gray-600"
          >
            Password
          </label>
          <input
            className="input"
            id="signup-password"
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
            Create new account
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
        onClick={toggleLogin}
      >
        <p className="text-sm">
          Have an account? <span className="text-link">Login</span>
        </p>
      </button>
    </div>
  );
};
