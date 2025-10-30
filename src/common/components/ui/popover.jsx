import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/common/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverArrow = ({ className, width = 16, height = 10, position = "center", ...props }) => (
  <PopoverPrimitive.Arrow
    width={width}
    height={height}
    className={cn(
      "fill-background shadow-2xl",
      "relative z-10",
      {
        "ml-4": position === "left",
        "mr-4": position === "right", 
        "mx-auto": position === "center",
      },
      className
    )}
    {...props}
  />
)
PopoverArrow.displayName = PopoverPrimitive.Arrow.displayName

const PopoverContent = ({ className, align = "center", sideOffset = 4, ref, ...props }) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-100 w-72 rounded-md border border-border bg-background p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverArrow }
