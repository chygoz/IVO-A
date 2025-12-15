"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Card } from "./card";

type WarningInfoProps = {
  text: string;
  className?: string;
};
function WarningInfo({ text, className }: WarningInfoProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "bg-transparent h-fit w-fit border-none hover:bg-transparent"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 stroke-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </div>
      </TooltipTrigger>
      <TooltipContent
        className={className ? "bg-transparent p-0 shadow-none" : ""}
      >
        <Card className={cn(className)}>
          <p>{text}</p>
        </Card>
      </TooltipContent>
    </Tooltip>
  );
}

export default WarningInfo;
