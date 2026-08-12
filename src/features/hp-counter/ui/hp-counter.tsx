import { cn } from "@/shared/utils/cn";

interface IProps {
  value: number;
}

export const HpCounter = ({ value }: IProps) => {
  const isLowHp = value <= 5;

  return (
    <div
      className={cn("text-[150px] w-full text-center", "select-none", isLowHp && "text-red-400")}
    >
      {value}
    </div>
  );
};
