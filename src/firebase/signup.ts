import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth/web-extension";
import { isEmail } from "validator";
import { isPasswordOk } from "../utils/validator";
import { APP_ERRORS } from "../consts/defaults";

export const db_signUpUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    if (!name) {
      throw new Error("name is required");
    }

    if (!isEmail(email)) {
      throw new Error("email is required or not correct");
    }

    if (!isPasswordOk(password)) {
      throw new Error(APP_ERRORS.weak_password);
    }

    const auth = getAuth();
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(userCred.user, {
      displayName: name,
    });

    return userCred.user;
  } catch (e: unknown) {
    if ((e as Error).message.includes("already-in-use")) {
      throw new Error(
        `You (${email}) have an active account. You can login with the same email.`,
      );
    }
    throw new Error("Unable to create new user");
  }
};
