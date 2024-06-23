import { FC } from "react";
import { AppContainer } from "./AppContainer";
import { Logo } from "./Logo";

import styles from "./index.module.css";
import { _cx } from "../utils/defaults";

export const AppLoaderView: FC = () => {
  return (
    <AppContainer>
      <div className="flex flex-col justify-center items-center mt-10">
        <Logo size="big" />
        <div
          className={_cx([
            "mt-4 flex flex-col items-center",
            styles.loader_bar,
          ])}
        >
          <div />
        </div>
      </div>
    </AppContainer>
  );
};
