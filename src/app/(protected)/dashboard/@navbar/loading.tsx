import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function LoadingComponent() {
  return (
    <div className="hidden sm:block fixed inset-x-0 top-0 md:pl-[var(--sidebar-width)] z-10">
      <div className="h-20 flex items-center px-6 text-black bg-white border border-solid border-[#D1D1D1]">
        <Skeleton className="size-6 rounded-full ml-auto " />
      </div>
    </div>
  );
}

export default LoadingComponent;
