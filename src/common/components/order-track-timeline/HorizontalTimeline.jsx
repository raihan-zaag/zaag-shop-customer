import { cn } from "@/common/lib/utils";
import StatusIcon from "./StatusIcon";
import StepIcon from "./StepIcon";


/**
 * HorizontalTimeline component shows the order progress steps at the top of the tracking view
 */
const HorizontalTimeline = ({ trackingSteps, currentStepIndex }) => (
    <div className="relative mb-10">

        {/* Connecting line across all steps */}
        <div className={cn("absolute top-11.25 left-0 w-full border-t-2 border-dashed border-neutral-400")}></div>

        {/* Icons and circles with labels */}
        <div className="flex items-center justify-between relative -mx-1">
            {trackingSteps.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;
                return (
                    <div key={step.id} className="space-y-1">
                        <StepIcon icon={step.icon} isCompleted={isCompleted} isCurrent={isCurrent} />
                        <StatusIcon
                            completed={isCompleted}
                            currentStatus={isCurrent}
                        />
                    </div>
                );
            })}
        </div>
    </div>
);

export default HorizontalTimeline;
