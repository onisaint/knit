import { useState } from "react";

export const useFormError = <
  T extends object,
  K = Record<keyof T, string>,
>() => {
  return useState<Partial<K & { network: string }>>();
};
