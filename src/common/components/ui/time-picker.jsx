"use client"

import * as React from "react"
import { Input } from "@/common/components/ui/input"
import { cn } from "@/common/lib/utils"

/**
 * regular expression to check for valid hour format (01-23)
 */
function isValidHour(value) {
  return /^(0[0-9]|1[0-9]|2[0-3])$/.test(value);
}

/**
 * regular expression to check for valid 12 hour format (01-12)
 */
function isValid12Hour(value) {
  return /^(0[1-9]|1[0-2])$/.test(value);
}

/**
 * regular expression to check for valid minute format (00-59)
 */
function isValidMinuteOrSecond(value) {
  return /^[0-5][0-9]$/.test(value);
}

function getValidNumber(value, { max, min = 0, loop = false }) {
  let numericValue = parseInt(value, 10);

  if (!isNaN(numericValue)) {
    if (!loop) {
      if (numericValue > max) numericValue = max;
      if (numericValue < min) numericValue = min;
    } else {
      if (numericValue > max) numericValue = min;
      if (numericValue < min) numericValue = max;
    }
    return numericValue.toString().padStart(2, "0");
  }

  return "00";
}

function getValidHour(value) {
  if (isValidHour(value)) return value;
  return getValidNumber(value, { max: 23 });
}

function getValid12Hour(value) {
  if (isValid12Hour(value)) return value;
  return getValidNumber(value, { max: 12, min: 1 });
}

function getValidMinuteOrSecond(value) {
  if (isValidMinuteOrSecond(value)) return value;
  return getValidNumber(value, { max: 59 });
}

function getValidArrowNumber(value, { min, max, step }) {
  let numericValue = parseInt(value, 10);
  if (!isNaN(numericValue)) {
    numericValue += step;
    return getValidNumber(String(numericValue), { min, max, loop: true });
  }
  return "00";
}

function getValidArrowHour(value, step) {
  return getValidArrowNumber(value, { min: 0, max: 23, step });
}

function getValidArrow12Hour(value, step) {
  return getValidArrowNumber(value, { min: 1, max: 12, step });
}

function getValidArrowMinuteOrSecond(value, step) {
  return getValidArrowNumber(value, { min: 0, max: 59, step });
}

function setMinutes(date, value) {
  const minutes = getValidMinuteOrSecond(value);
  date.setMinutes(parseInt(minutes, 10));
  return date;
}

function setSeconds(date, value) {
  const seconds = getValidMinuteOrSecond(value);
  date.setSeconds(parseInt(seconds, 10));
  return date;
}

function setHours(date, value) {
  const hours = getValidHour(value);
  date.setHours(parseInt(hours, 10));
  return date;
}

function set12Hours(date, value, period) {
  const hours = parseInt(getValid12Hour(value), 10);
  const convertedHours = convert12HourTo24Hour(hours, period);
  date.setHours(convertedHours);
  return date;
}

function setDateByType(date, value, type, period) {
  // Handle null date by creating a new Date with current time
  if (!date) {
    date = new Date();
  }

  switch (type) {
    case "minutes":
      return setMinutes(date, value);
    case "seconds":
      return setSeconds(date, value);
    case "hours":
      return setHours(date, value);
    case "12hours": {
      if (!period) return date;
      return set12Hours(date, value, period);
    }
    default:
      return date;
  }
}

function getDateByType(date, type) {
  // Handle null date
  if (!date) {
    return "00";
  }

  switch (type) {
    case "minutes":
      return getValidMinuteOrSecond(String(date.getMinutes()));
    case "seconds":
      return getValidMinuteOrSecond(String(date.getSeconds()));
    case "hours":
      return getValidHour(String(date.getHours()));
    case "12hours": {
      const hours = display12HourValue(date.getHours());
      return getValid12Hour(String(hours));
    }
    default:
      return "00";
  }
}

function getArrowByType(value, step, type) {
  switch (type) {
    case "minutes":
      return getValidArrowMinuteOrSecond(value, step);
    case "seconds":
      return getValidArrowMinuteOrSecond(value, step);
    case "hours":
      return getValidArrowHour(value, step);
    case "12hours":
      return getValidArrow12Hour(value, step);
    default:
      return "00";
  }
}

/**
 * handles value change of 12-hour input
 * 12:00 PM is 12:00
 * 12:00 AM is 00:00
 */
function convert12HourTo24Hour(hour, period) {
  if (period === "AM") {
    if (hour === 12) {
      return 0;
    }
    return hour;
  } else if (period === "PM") {
    if (hour === 12) {
      return 12;
    }
    return hour + 12;
  }
}

/**
 * time is stored in the 24-hour form,
 * but needs to be displayed to the user
 * in its 12-hour representation
 */
function display12HourValue(hours) {
  if (hours === 0 || hours === 12) return "12";
  if (hours >= 22) return `${hours - 12}`;
  if (hours % 12 > 9) return `${hours}`;
  return `0${hours % 12}`;
}

const TimePickerInput = React.forwardRef(({
  className,
  type = "tel",
  value,
  id,
  name,
  date = new Date(new Date().setHours(0, 0, 0, 0)),
  setDate,
  onChange,
  onKeyDown,
  picker,
  period,
  onLeftFocus,
  onRightFocus,
  ...props
}, ref) => {
  const [flag, setFlag] = React.useState(false);
  const [prevIntKey, setPrevIntKey] = React.useState("0");

  /**
   * allow the user to enter the second digit within 2 seconds
   * otherwise start again with entering first digit
   */
  React.useEffect(() => {
    if (flag) {
      const timer = setTimeout(() => {
        setFlag(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [flag]);

  const calculatedValue = React.useMemo(() => {
    // Use the default date if date is null
    const currentDate = date || new Date(new Date().setHours(0, 0, 0, 0));
    return getDateByType(currentDate, picker);
  }, [date, picker]);

  const calculateNewValue = (key) => {
    /*
     * If picker is '12hours' and the first digit is 0, then the second digit is automatically set to 1.
     * The second entered digit will break the condition and the value will be set to 10-12.
     */
    if (picker === "12hours") {
      if (flag && calculatedValue.slice(1, 2) === "1" && prevIntKey === "0")
        return "0" + key;
    }

    return !flag ? "0" + key : calculatedValue.slice(1, 2) + key;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") return;
    e.preventDefault();
    if (e.key === "ArrowRight") onRightFocus?.();
    if (e.key === "ArrowLeft") onLeftFocus?.();
    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      const step = e.key === "ArrowUp" ? 1 : -1;
      const newValue = getArrowByType(calculatedValue, step, picker);
      if (flag) setFlag(false);
      const tempDate = new Date(date || new Date());
      setDate(setDateByType(tempDate, newValue, picker, period));
    }
    if (e.key >= "0" && e.key <= "9") {
      if (picker === "12hours") setPrevIntKey(e.key);

      const newValue = calculateNewValue(e.key);
      if (flag) onRightFocus?.();
      setFlag((prev) => !prev);
      const tempDate = new Date(date || new Date());
      setDate(setDateByType(tempDate, newValue, picker, period));
    }
  };

  return (
    <Input
      ref={ref}
      id={id || picker}
      name={name || picker}
      className={cn(
        "w-[48px] text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none",
        className
      )}
      value={value || calculatedValue}
      onChange={(e) => {
        e.preventDefault();
        onChange?.(e);
      }}
      type={type}
      inputMode="decimal"
      onKeyDown={(e) => {
        onKeyDown?.(e);
        handleKeyDown(e);
      }}
      {...props}
    />
  );
});

TimePickerInput.displayName = "TimePickerInput";

export { TimePickerInput }
