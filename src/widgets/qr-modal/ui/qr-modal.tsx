import { Dialog } from "@base-ui/react";
import type { ReactNode } from "react";

import { absolutePath } from "@/shared/utils/absolute-path";
import { cn } from "@/shared/utils/cn";

interface IProps {
  children: ReactNode;
}

export const QrModal = ({ children }: IProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={cn("backdrop-blur-[30px]", "fixed inset-0")} />
        <Dialog.Popup
          className={cn(
            "fixed top-30 left-1/2 -translate-x-1/2",
            "bg-[#111] p-6 border border-neutral-200",
            "w-full max-w-sm"
          )}
        >
          <div className="grid gap-2">
            <Dialog.Title className="text-xl">Поделиться</Dialog.Title>
            <Dialog.Description className={"text-sm text-neutral-400 tracking-[2px] text-wrap"}>
              Отсканируй меня, чтобы не искать ссылку :)
            </Dialog.Description>
          </div>
          <img alt="QR code" src={absolutePath("qr.svg")} className="mt-4 w-full"/>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
