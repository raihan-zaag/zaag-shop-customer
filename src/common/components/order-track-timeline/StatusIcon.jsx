import { Check } from "lucide-react";
import { cn } from "@/common/lib/utils";

const StatusIcon = ({ completed, currentStatus }) => (
  <div className="bg-secondary size-8 rounded-full flex items-center justify-center">
    <div className={cn(
      "flex items-center justify-center size-5 rounded-full transition-colors duration-200 bg-primary",
      {
        'border border-neutral-400 bg-background': !completed && !currentStatus
      }
    )}>
      <Check className={cn(
        "size-3 transition-colors duration-200",
        {
          'text-white': completed || currentStatus,
          'text-neutral-400': !completed && !currentStatus
        }
      )} />
    </div>
  </div>
);

export default StatusIcon;
