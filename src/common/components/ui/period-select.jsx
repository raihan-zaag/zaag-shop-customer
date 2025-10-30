"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select"

function display12HourValue(hours) {
  if (hours === 0 || hours === 12) return "12";
  if (hours >= 22) return `${hours - 12}`;
  if (hours % 12 > 9) return `${hours}`;
  return `0${hours % 12}`;
}

function setDateByType(date, value, type, period) {
  switch (type) {
    case "12hours": {
      if (!period) return date;
      const hours = parseInt(value, 10);
      const convertedHours = period === "AM" 
        ? (hours === 12 ? 0 : hours)
        : (hours === 12 ? 12 : hours + 12);
      date.setHours(convertedHours);
      return date;
    }
    default:
      return date;
  }
}

export const TimePeriodSelect = React.forwardRef(({ 
  period, 
  setPeriod, 
  date, 
  setDate, 
  onLeftFocus, 
  onRightFocus 
}, ref) => {
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") onRightFocus?.();
    if (e.key === "ArrowLeft") onLeftFocus?.();
  };

  const handleValueChange = (value) => {
    setPeriod(value);

    /**
     * trigger an update whenever the user switches between AM and PM;
     * otherwise user must manually change the hour each time
     */
    if (date) {
      const tempDate = new Date(date);
      const hours = display12HourValue(date.getHours());
      setDate(
        setDateByType(
          tempDate,
          hours.toString(),
          "12hours",
          period === "AM" ? "PM" : "AM"
        )
      );
    }
  };

  return (
    <div className="flex h-10 items-center">
      <Select
        value={period}
        onValueChange={handleValueChange}
      >
        <SelectTrigger
          ref={ref}
          className="w-[65px] focus:bg-accent focus:text-accent-foreground"
          onKeyDown={handleKeyDown}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
});

TimePeriodSelect.displayName = "TimePeriodSelect";
