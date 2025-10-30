import { Package, Truck, CheckCircle } from "lucide-react";

export const TRACKING_STEPS = [
  { id: "ORDER_PLACED", label: "Order Placed", icon: Package },
  { id: "SHIPPED", label: "Order Shipped", icon: Truck },
  { id: "OUT_FOR_DELIVERY", label: "Order Out for Delivery", icon: Truck },
  { id: "DELIVERED", label: "Order Delivered", icon: CheckCircle }
];

export const ORDER_STATUS_MAP = {
  "ORDER_PLACED": "ORDER_PLACED",
  "ORDER_CONFIRMED": "ORDER_CONFIRMED",
  "PAYMENT_PENDING": "ORDER_PLACED",
  "PAYMENT_FAILED": "PAYMENT_FAILED",
  "PROCESSING": "ORDER_PLACED",
  "SHIPPED": "SHIPPED",
  "ORDER_ON_THE_WAY": "OUT_FOR_DELIVERY",
  "ORDER_DELIVERED": "DELIVERED",
  "DELIVERED": "DELIVERED",
  "ORDER_CANCELED": "ORDER_PLACED"
};

export const STATUS_LABELS = {
  "ORDER_PLACED": "Order Placed",
  "ORDER_CONFIRMED": "Order Confirmed",
  "SHIPPED": "Order Shipped",
  "OUT_FOR_DELIVERY": "Out for Delivery", 
  "DELIVERED": "Order Delivered",
  "ORDER_CANCELED": "Order Canceled",
  "PAYMENT_FAILED": "Payment Failed"
};
