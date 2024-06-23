import { FC, ReactNode } from "react";

import styles from "./index.module.css";

export const AppContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.app_container}>{children}</div>;
};
