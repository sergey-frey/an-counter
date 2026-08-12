import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/shared/utils/cn";

import styles from "../styles/index.module.css";

interface IProps {
  dependencies?: unknown[];
}

export const InteractiveArea = ({ dependencies = [] }: IProps) => {
  const [incrementor, setIncrementor] = useState(0);

  const interaction = useCallback(() => {
    setIncrementor((prev) => prev + 1);
  }, []);

  useEffect(() => {
    interaction();
  }, [...dependencies, interaction]);

  const isFirstInteraction = incrementor > 0 && incrementor % 2 === 1;
  const isSecondInteraction = incrementor > 0 && incrementor % 2 === 0;

  return (
    <div
      className={cn(
        "rounded-xl relative",
        styles.interactive_area,
        isFirstInteraction && styles.first_interaction,
        isSecondInteraction && styles.second_interaction,
      )}
    />
  );
};
