
import { cn } from "@/common/lib/utils";

const StepIcon = ({ icon, isCompleted, isCurrent, className, ...props }) => {
    const Icon = icon;
    return (
        <div className="mx-1">
            <Icon
                className={cn(
                    "size-6 transition-colors duration-200 text-primary",
                    {
                        'text-gray-400': !isCompleted && !isCurrent
                    },
                    className
                )}
                {...props}
            />
        </div>
    );
};

export default StepIcon;