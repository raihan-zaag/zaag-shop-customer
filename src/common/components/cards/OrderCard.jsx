
import { useRouter } from "next/navigation";
import { Eye, Wallet } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { Badge } from "@/common/components/ui/badge";
import Typography from "@/common/components/Typography";
import { cn, formatTimestamp } from "@/common/lib/utils";
import { PATH_ORDER_DETAILS_DYNAMIC } from "@/common/config/constants/routes";
import RefundRequestSheet from "@/sections/orderSummary/RefundRequestSheet";

const OrderCard = ({ order }) => {
  const router = useRouter();

  // Handler for refund request submission
  const submitRefundRequest = (data) => {
    if (!data.reason.trim()) {
      alert("Please provide a reason for your refund request.");
      return;
    }

    // In a real app, you would submit this to an API
    // Refund request submitted with data

    // Show success message
    alert("Your refund request has been submitted successfully!");
  };

  // Get badge variant based on order status
  const getBadgeVariant = () => {
    switch (order?.orderStatus) {
      case "ORDER_PLACED":
        return "text-info";
      case "DELIVERED":
        return "text-success";
      case "ORDER_CANCELED":
        return "text-destructive";
      case "PAYMENT_PENDING":
        return "text-warning";
      default:
        return "text-text-primary";
    }
  };

  // Get status text to display
  const getStatusText = () => {
    switch (order?.orderStatus) {
      case "ORDER_PLACED":
        return "Order Placed";
      case "DELIVERED":
        return "Delivered";
      case "ORDER_CANCELED":
        return "Canceled";
      case "PAYMENT_PENDING":
        return "Payment Pending";
      default:
        return order?.orderStatus?.replace(/_/g, " ") || "Processing";
    }
  };

  return (
    <div className="py-4 border-b border-border relative">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        {/* Left side - Order information */}
        <div className="w-full space-y-1 mb-3 md:mb-0">
          <div className="flex items-center">
            <Typography.BodyText className="font-medium text-text-primary">
              Order Id
              <span className="font-semibold text-text-primary ms-1">
                #{order.invoiceNumber}
              </span>
            </Typography.BodyText>
          </div>

          <Typography.SmallText className="text-text-subtle">
            {formatTimestamp(order.createdAt)}
          </Typography.SmallText>

          <Typography.BodyText className="font-medium mt-1">
            Total
            <span className="font-semibold text-text-primary ms-1">
              ${order.invoice.totalFinalPrice}
            </span>
          </Typography.BodyText>

          {/* Status badge */}
          <Badge
            variant="secondary"
            size="xl"
            className={cn("mb-3 md:mb-0 font-medium", getBadgeVariant())}
          >
            {getStatusText()}
          </Badge>
        </div>


        {/* Right side - View details button */}
        <div className="w-full flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              router.push(PATH_ORDER_DETAILS_DYNAMIC(order.invoiceNumber))
            }
            icon={<Eye className="size-4" />}
            className="text-primary hover:bg-primary/10"
          >
            View Details
          </Button>

          <RefundRequestSheet
            productInfo={{
              id: order.id,
              name: order.product?.name || "Handcrafted Item",
              image: order.product?.image || "/images/image_placeholder.png",
              price: (order.price * order.quantity).toFixed(2),
              color: order.color,
              size: order.size,
              quantity: order.quantity
            }}
            onSubmit={submitRefundRequest}
            onCancel={() => { }}
          >
            <Button
              variant="outline"
              size="sm"
              className="text-text-subtle hover:text-text-primary hover:bg-primary/10"
              icon={<Wallet className="size-4" />}
            >
              Refund request
            </Button>
          </RefundRequestSheet>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
