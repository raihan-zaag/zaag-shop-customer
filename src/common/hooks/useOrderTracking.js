import { ORDER_STATUS_MAP, STATUS_LABELS, TRACKING_STEPS } from "@/common/lib/orderTrackingConstants";
import { useMemo } from "react";

export const useOrderTracking = (order) => {
    const currentStatus = useMemo(() => {

        // Handle canceled orders specially
        if (order.orderStatus === "ORDER_CANCELED") {
            return "ORDER_CANCELED";
        }

        // Handle payment failed orders specially
        if (order.orderStatus === "PAYMENT_FAILED") {
            return "PAYMENT_FAILED";
        }

        return ORDER_STATUS_MAP[order.orderStatus] || "ORDER_PLACED";
    }, [order?.orderStatus]);

    const currentStepIndex = useMemo(() => {
        if (!currentStatus) return -1;
        return TRACKING_STEPS.findIndex(step => step.id === currentStatus);
    }, [currentStatus]);

    const statusLabel = useMemo(() => {
        return STATUS_LABELS[currentStatus] || STATUS_LABELS["ORDER_PLACED"];
    }, [currentStatus]);

    const statusUpdates = useMemo(() => {
        return [
            {
                id: "ORDER_PLACED",
                text: "Order has been placed",
                date: order?.createdAt || "Friday, January 21, 2023",
                completed: currentStepIndex >= 0,
                isCurrent: currentStepIndex === 0
            },
            {
                id: "ORDER_CONFIRMED",
                text: "Order conformed",
                date: order?.processedAt || "Saturday, January 22, 2023",
                completed: currentStepIndex >= 1,
                isCurrent: currentStepIndex === 1
            },
            {
                id: "SHIPPED",
                text: "We are processing your order",
                date: order?.processedAt || "Saturday, January 23, 2023",
                completed: currentStepIndex >= 1,
                isCurrent: currentStepIndex === 1
            },
            {
                id: "OUT_FOR_DELIVERY",
                text: "Order has been shipped & on its way",
                date: order?.shippedAt || "Saturday, January 24, 2023",
                completed: currentStepIndex >= 2,
                isCurrent: currentStepIndex === 2
            },
            {
                id: "DELIVERED",
                text: "Order has been delivered",
                date: order?.deliveredAt || "Saturday, January 25, 2023",
                time: "12:45 AM",
                completed: currentStepIndex >= 3,
                isCurrent: currentStepIndex === 3
            },
            
        ];
    }, [currentStepIndex, order]);

    const isCanceled = order?.orderStatus === "ORDER_CANCELED";
    const isPaymentFailed = order?.orderStatus === "PAYMENT_FAILED";

    return {
        currentStatus,
        currentStepIndex,
        statusLabel,
        statusUpdates,
        isCanceled,
        isPaymentFailed,
        trackingSteps: TRACKING_STEPS
    };
};
