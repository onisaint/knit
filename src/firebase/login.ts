import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { isEmail } from "validator";
import { APP_ERRORS } from "../consts/defaults";
import { isPasswordOk } from "../utils/validator";

export const db_loginUser = async (email: string, password: string) => {
  try {
    if (!isEmail(email)) {
      throw new Error("email is required or not correct");
    }

    if (!isPasswordOk(password)) {
      throw new Error(APP_ERRORS.weak_password);
    }

    const auth = getAuth();
    const userCred = await signInWithEmailAndPassword(auth, email, password);

    return userCred.user;
  } catch (e: unknown) {
    if ((e as Error).message.includes("invalid")) {
      throw new Error("Given email or password is not correct.");
    }

    throw new Error("Unable to login. Try again!");
  }
};
