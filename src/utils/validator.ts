import { isStrongPassword } from "validator";

export const isPasswordOk = (p: string) =>
  isStrongPassword(p, {
    minLength: 7,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  });
