import React from "react";
import Logo from "./logo";
import { cn } from "@/lib/utils";

type EmptyImageProps = {
  className?: string;
};

function EmptyImage({ className }: EmptyImageProps) {
  return (
    <div
      className={cn(
        "bg-[#F4B095] p-6 flex flex-col items-center justify-center rounded-2xl",
        className
      )}
    >
      <Logo />
    </div>
  );
}

export default EmptyImage;
