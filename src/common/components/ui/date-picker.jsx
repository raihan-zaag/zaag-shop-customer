"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/common/lib/utils"
import { Button } from "@/common/components/ui/button"
import { Calendar } from "@/common/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/common/components/ui/popover"

export function DatePicker({
    value,
    onChange,
    placeholder = "Pick a date",
    disabled = false,
    className,
    ...props
}) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-between text-left font-normal",
                        !value && "text-muted-foreground",
                        disabled && "opacity-50 cursor-not-allowed",
                        className
                    )}
                    disabled={disabled}
                    {...props}
                >

                    {value ? format(value, "PPP") : <span>{placeholder}</span>}
                    <CalendarIcon className="mr-2 h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto" align="start">
                <Calendar
                    className="rounded-primary"
                    mode="single"
                    selected={value}
                    onSelect={(date) => {
                        onChange?.(date)
                        setOpen(false)
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
