
import { CreditCard, AlertTriangle } from "lucide-react";
import Typography from "@/common/components/Typography";
import { Button } from "@/common/components/ui/button";
import { cn } from "@/common/lib/utils";

/**
 * PaymentFailedView component displays when a payment has failed
 */
const PaymentFailedView = ({ onRetryPayment }) => {
  const handleRetryPayment = () => {
    if (onRetryPayment) {
      onRetryPayment();
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center py-6")}>
      <div className={cn("w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4")}>
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <Typography.BodyText className={cn("text-destructive font-medium mb-2")}>
        Payment Failed
      </Typography.BodyText>
      <Typography.Description className="mb-6 text-center max-w-sm">
        Your payment could not be processed. Please try again or contact support for assistance.
      </Typography.Description>
      <Button 
        onClick={handleRetryPayment}
        className="flex items-center gap-2"
        icon={CreditCard}
        iconPosition="left"
      >
        Try Payment Again
      </Button>
    </div>
  );
};

export default PaymentFailedView;