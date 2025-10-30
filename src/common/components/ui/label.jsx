import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority"
import { cn } from "@/common/lib/utils"


const labelVariants = cva(
  "block text-sm mb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = ({ className, ref, ...props }) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
)

export { Label }
