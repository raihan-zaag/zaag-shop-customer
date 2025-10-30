import Typography from "@/common/components/Typography";
import { cn } from "@/common/lib/utils";
import StatusIcon from "./StatusIcon";

const TimelineItem = ({ item, isLast }) => (
  <div className="relative pl-8 ">
    {/* Vertical line connecting events */}
    {!isLast && (
      <div className={cn("absolute left-3.5 top-6 border-l-2 border-dashed border-neutral-400 h-full")}></div>
    )}

    {/* Event content */}
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        {/* Status icon */}
        <div className="absolute left-0 top-0">
          <StatusIcon 
            completed={item.completed && !item.isCurrent} 
            currentStatus={item.isCurrent}
          />
        </div>

        {/* Event text */}
        <Typography.BodyText className={cn(
          "text-sm mt-1.5",
          item.completed ? 'text-text-primary' : 'text-text-subtle'
        )}>
          {item.text}
        </Typography.BodyText>
      </div>

      {/* Time */}
      {item.time && (
        <Typography.SmallText className="text-text-subtle">
          {item.time}
        </Typography.SmallText>
      )}
    </div>
  </div>
);

/**
 * VerticalTimeline component renders the detailed timeline of order status updates
 */
const VerticalTimeline = ({ statusUpdates }) => {
  // Group status updates by date for cleaner rendering
  const groupedUpdates = statusUpdates.reduce((groups, update) => {
    const date = update.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(update);
    return groups;
  }, {});

  return (
    <div>
      {Object.entries(groupedUpdates).map(([date, updates]) => (
        <div key={date} className="mb-4">
          <Typography.BodyText className={cn("mb-4 text-text-secondary font-medium")}>
            {date}
          </Typography.BodyText>

          <div className="space-y-7">
            {updates.map((update, index) => (
              <TimelineItem
                key={`${date}-${index}`}
                item={update}
                isLast={index === updates.length - 1}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalTimeline;
