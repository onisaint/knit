import { DependencyList, useEffect, useRef } from "react";

export const useDebounce = (
  fn: () => void,
  ms: number = 0,
  dps: DependencyList = [],
) => {
  const timer = useRef(0);

  useEffect(() => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => fn(), ms);
  }, dps);
};
