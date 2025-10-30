import { AlertCircle } from "lucide-react";
import Typography from "@/common/components/Typography";
import { cn } from "@/common/lib/utils";

/**
 * CanceledOrderView component displays when an order has been canceled
 */
const CanceledOrderView = () => (
  <div className={cn("flex flex-col items-center justify-center py-6")}>
    <div className={cn("w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4")}>
      <AlertCircle className="h-8 w-8 text-destructive" />
    </div>
    <Typography.BodyText className={cn("text-destructive font-medium mb-2")}>
      Order Canceled
    </Typography.BodyText>
    <Typography.Description>
      This order has been canceled and will not be processed further.
    </Typography.Description>
  </div>
);

export default CanceledOrderView;
