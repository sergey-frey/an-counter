import { type ReactNode, useCallback, useEffect, useRef } from "react";

interface IProps {
  children: ReactNode;
  onClick?: () => void;
  onHold?: () => void;
}

const HOLDING_DURATION = 400;

export const CounterLayer = ({ children, onClick, onHold }: IProps) => {
  const holdingStartTimestampRef = useRef<number>(null);
  const holdingIntervalRef = useRef<ReturnType<typeof setInterval>>(null);
  const amountOfHoldingsRef = useRef<number>(0);

  const handlePointerDown = () => {
    holdingStartTimestampRef.current = Date.now();
    amountOfHoldingsRef.current = 0;

    if (holdingIntervalRef.current !== null) {
      return;
    }

    holdingIntervalRef.current = setInterval(() => {
      onHold?.();
      amountOfHoldingsRef.current += 1;
    }, HOLDING_DURATION);
  };

  const handlePointerUp = useCallback(() => {
    if (holdingIntervalRef.current === null) {
      return;
    }

    clearInterval(holdingIntervalRef.current);
    holdingIntervalRef.current = null;

    if (amountOfHoldingsRef.current > 0) {
      return;
    }

    onClick?.();
  }, []);

  useEffect(() => {
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [handlePointerUp]);

  return (
    <button
      type="button"
      className="contents"
      onPointerDown={handlePointerDown}
      onTouchStart={handlePointerDown}
    >
      {children}
    </button>
  );
};
