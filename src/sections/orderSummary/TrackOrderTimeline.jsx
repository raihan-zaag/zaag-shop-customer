"use client";

import Typography from "@/common/components/Typography";
import { cn } from "@/common/lib/utils";
import { useOrderTracking } from "@/common/hooks/useOrderTracking";
import CanceledOrderView from "@/common/components/order-track-timeline/CanceledOrderView";
import PaymentFailedView from "@/common/components/order-track-timeline/PaymentFailedView";
import HorizontalTimeline from "@/common/components/order-track-timeline/HorizontalTimeline";
import VerticalTimeline from "@/common/components/order-track-timeline/VerticalTimeline";


const TrackOrderTimeline = ({ order, onRetryPayment }) => {
  const {
    statusLabel,
    statusUpdates,
    isCanceled,
    isPaymentFailed,
    trackingSteps,
    currentStepIndex
  } = useOrderTracking(order);

  return (
    <div className="bg-secondary rounded-primary p-4 md:p-8 mb-6">
      <Typography.Title3 className="mb-2 font-semibold">
        Track Order
      </Typography.Title3>

      <div className="mb-6 flex items-center">
        <Typography.SmallText className="text-text-secondary mr-2 font-semibold">
          Status: <span className="text-primary">{statusLabel}</span>
        </Typography.SmallText>
      </div>

      {isCanceled ? (
        <CanceledOrderView />
      ) : isPaymentFailed ? (
        <PaymentFailedView onRetryPayment={onRetryPayment} />
      ) : (
        <div className="relative">
          <HorizontalTimeline
            trackingSteps={trackingSteps}
            currentStepIndex={currentStepIndex}
          />
          <VerticalTimeline statusUpdates={statusUpdates} />
        </div>
      )}
    </div>
  );
};

export default TrackOrderTimeline;
