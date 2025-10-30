"use client";

import { Crosshair } from "lucide-react";
import Typography from "@/common/components/Typography";
import { cn, formatTimestamp } from "@/common/lib/utils";


const OrderInformation = ({ order, getStatusText }) => {
  // Reusable field component to reduce repetition
  const InfoField = ({ label, value, className = "", isLast = false }) => (
    <section className={cn("py-4", !isLast && "border-b border-border", className)}>
      <Typography.SmallText className="text-text-primary font-semibold mb-2">
        {label}
      </Typography.SmallText>
      <Typography.BodyText className={value?.startsWith('#') ? "text-primary font-medium" : "text-text-secondary"}>
        {value}
      </Typography.BodyText>
    </section>
  );

  return (
    <article className="flex-1 bg-secondary rounded-primary p-4 md:p-8">
      <Typography.Title3 className="mb-5 font-semibold">Order Information</Typography.Title3>

      {/* Order ID and Track button */}
      <div className="flex justify-between items-center py-4 border-b border-border">
        <div>
          <Typography.SmallText className="text-text-primary font-semibold mb-2">
            Order Id
          </Typography.SmallText>
          <Typography.BodyText className="text-primary font-medium">
            #{order.invoiceNumber}
          </Typography.BodyText>
        </div>
      </div>

      {/* Order details using reusable component */}
      <InfoField
        label="Current order status"
        value={getStatusText(order.orderStatus)}
      />

      <InfoField
        label="Order Date & time"
        value={formatTimestamp(order.createdAt)}
      />

      <InfoField
        label="Email address"
        value={order.user?.email || "username@mail.com"}
      />

      <InfoField
        label="Phone number"
        value={order.shippingAddress?.phone || "+46 70 123 4567"}
      />

      <InfoField
        label="Delivery type"
        value={order.deliveryType || "Regular"}
      />

      <InfoField
        label="Payment method"
        value={order.paymentMethod || "Stripe"}
      />

      <InfoField
        label="Delivery Address"
        value={`${order.shippingAddress?.addressLine1 || "123 Main Street"}, ${order.shippingAddress?.city || "Stockholm"}, ${order.shippingAddress?.postalCode || "10044"}, ${order.shippingAddress?.country || "Sweden"}`}
      />

      <InfoField
        label="Order Note"
        value={order.note || "Please Carefully Package it"}
        isLast={true}
      />
    </article>
  );
};

export default OrderInformation;
