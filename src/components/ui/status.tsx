import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const statusVariants = cva("", {
  variants: {
    variant: {
      default: "rounded-[40px]",
      destructive: "bg-[#FEE2E2] text-[#7F1D1D]",
      success: "bg-[#DCFCE7] text-[#14532D]",
      warning: "bg-[#FEF9C3] text-[#713F12]",
      info: "bg-secondary-50 text-secondary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface StatusProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof statusVariants> {
  text?: string;
  textClassName?: string;
  className?: string;
  random?: boolean;
}
function Status({
  variant: v,
  random,
  text,
  className,
  textClassName,
}: StatusProps) {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  let variant = v;

  if (random) {
    //@ts-expect-error it works
    variant = ["success", "info", "warning", "destructive"][randomNumber];
  }

  return (
    <div
      className={cn(
        "w-[103px] font-bold h-[28px] flex items-center rounded-[40px] py-[5px] px-[9px] capitalize",
        statusVariants({ variant, className })
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="none"
        className="mr-2 shrink-0"
      >
        <circle cx="4.5" cy="4.5" r="4" fill="currentColor" />
      </svg>
      <span className={cn("text-xs", textClassName)}> {text}</span>
    </div>
  );
}

export default Status;
