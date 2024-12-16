"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-[12px]", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-[16px] sm:space-x-[16px] sm:space-y-[0px]",
        month: "space-y-[16px]",
        caption: "flex justify-center pt-[4px] relative items-center",
        caption_label: "text-[14px] font-medium",
        nav: "space-x-[4px] flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-[28px] w-[28px] bg-transparent p-[0px] opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-[4px]",
        nav_button_next: "absolute right-[4px]",
        table: "w-full border-collapse space-y-[4px]",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-[32px] font-normal text-[12.8px]",
        row: "flex w-full mt-[8px]",
        cell: cn(
          "relative p-[0px] text-center text-[14px] focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-[32px] w-[32px] p-[0px] font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-[16px] w-[16px]" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-[16px] w-[16px]" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
