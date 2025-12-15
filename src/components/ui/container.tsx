import { cn } from "@/lib/utils";
import React from "react";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("h-full grow text-[#060606]", className)}>
      {children}
    </div>
  );
}

export default Container;
