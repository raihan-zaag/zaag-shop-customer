import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"
import { cn } from "@/common/lib/utils"

// RadioGroup wrapper
const RadioGroup = ({ className, ...props }) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
    />
  )
}
RadioGroup.displayName = "RadioGroup"

// Individual radio item
const RadioGroupItem = ({ className, ...props }) => {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "cursor-pointer aspect-square size-4 rounded-full border-2 border-gray-300 " +
        "text-[var(--color-primary)] ring-offset-background focus:outline-none " +
        "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] " +
        "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 " +
        "data-[state=checked]:border-[var(--color-primary)] data-[state=checked]:bg-white",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="size-2 fill-current text-[var(--color-primary)]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
