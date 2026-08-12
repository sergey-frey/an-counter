import { absolutePath } from "@/shared/utils/absolute-path";
import { cn } from "@/shared/utils/cn";

interface IProps {
  value: number;
  amountOfBonuses: number;
}

export const DeadMedalsCounter = ({ value }: IProps) => {
  return (
    <div className="flex text-green-600 select-none">
      <div className={cn("grid items-center gap-2")}>
        <div className={cn("flex items-center gap-1 text-2xl font-medium font-mono")}>
          <img src={absolutePath("dead.svg")} width={30} height={30} alt="dead-wizard-medal-icon" />
          {value}
        </div>
      </div>
    </div>
  );
};
