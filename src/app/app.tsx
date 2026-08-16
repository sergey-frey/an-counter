import { QrCodeIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

import { DeadMedalsCounter } from "@/features/dead-medals-counter";
import { HpCounter } from "@/features/hp-counter";
import { CounterLayer } from "@/shared/ui/counter-layer";
import { InteractiveArea } from "@/shared/ui/interactive-area";
import { cn } from "@/shared/utils/cn";
import { QrModal } from "@/widgets/qr-modal";

function App() {
  const [hpCounter, setHpCounter] = useState(20);
  const [deadMedalsCounter, setDeadMedalsCounter] = useState(0);
  const [incrementHoldsCounter, setIncrementHoidsCounter] = useState(0);
  const [decrementHoldsCounter, setDecrementHoidsCounter] = useState(0);

  const incrementHpCounterBy = (value: number) => {
    setHpCounter((prev) => {
      return Math.min(25, prev + value);
    });
    setIncrementHoidsCounter((prev) => prev + 1);
  };

  const decrementHpCounterBy = (value: number) => {
    setHpCounter((prev) => {
      return Math.max(0, prev - value);
    });
    setDecrementHoidsCounter((prev) => prev + 1);
  };

  return (
    <main className={cn("flex w-full min-h-full")}>
      <div className={cn("w-full max-w-100 min-h-full mx-auto", "grid grid-rows-[auto_1fr]")}>
        <section className="p-4 flex justify-between items-center">
          <QrModal>
            <QrCodeIcon className="size-7" />
          </QrModal>

          <CounterLayer
            onClick={() => setDeadMedalsCounter((prev) => prev + 1)}
            onHold={() => setDeadMedalsCounter((prev) => Math.max(0, prev - 1))}
          >
            <DeadMedalsCounter value={deadMedalsCounter} amountOfBonuses={2} />
          </CounterLayer>
        </section>

        <section className="p-4 pt-50 w-full relative">
          <div className={cn("absolute inset-2", "grid grid-cols-2 gap-2")}>
            <CounterLayer
              onClick={() => decrementHpCounterBy(1)}
              onHold={() => decrementHpCounterBy(10)}
            >
              {/*<div />*/}
              <InteractiveArea dependencies={[decrementHoldsCounter]} />
            </CounterLayer>

            <CounterLayer
              onClick={() => incrementHpCounterBy(1)}
              onHold={() => incrementHpCounterBy(10)}
            >
              {/*<div />*/}
              <InteractiveArea dependencies={[incrementHoldsCounter]} />
            </CounterLayer>
          </div>
          <HpCounter value={hpCounter} />

          <div className="grid grid-cols-2 gap-4"></div>
        </section>
      </div>
    </main>
  );
}

export default App;
