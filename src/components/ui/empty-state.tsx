import SearchingDataIcon from "@/lib/icons/searching-data";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type EmptyStateProps = {
  children?: ReactNode;
  className?: string;
};

function EmptyState({ children, className }: EmptyStateProps) {
  return (
    <div className="flex flex-col w-full justify-center font-medium text-lg gap-4 items-center">
      <SearchingDataIcon className={cn("size-80", className)} />
      <div>{children}</div>
    </div>
  );
}

export default EmptyState;
