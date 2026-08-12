import { type ReactNode, useRef } from "react";

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

  const handlePointerUp = () => {
    if (holdingIntervalRef.current === null) {
      return;
    }

    clearInterval(holdingIntervalRef.current);
    holdingIntervalRef.current = null;

    if (amountOfHoldingsRef.current > 0) {
      return;
    }

    onClick?.();
  };

  return (
    <button
      type="button"
      className="contents"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {children}
    </button>
  );
};
