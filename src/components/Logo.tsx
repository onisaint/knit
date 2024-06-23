import { FC } from "react";
import { _cx } from "../utils/defaults";

export const Logo: FC<{ size?: "big" | "normal" }> = ({ size }) => {
  return (
    <h2 className={_cx(["font-sans"], { "text-3xl": size === "big" })}>Knit</h2>
  );
};
