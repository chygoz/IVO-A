import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";

type HeroWrapperProps = {
  className?: string;
  main: React.ReactNode;
  sub?: React.ReactNode;
  subWrapperClassName?: string;
  subContainerClassName?: string;
};

function HeroWrapper({
  main,
  className,
  sub,
  subWrapperClassName,
  subContainerClassName,
}: HeroWrapperProps) {
  return (
    <div className="bg-primary-50">
      <div className="relative">
        <section
          className={cn(
            "h-screen overflow-hidden bg-[#010204]  pt-[7.875rem] w-full relative flex flex-col gap-8 px-4 md:px-0 isolate",
            className
          )}
        >
          <div className="absolute inset-0 z-[-2]">
            <div className="relative h-full w-full">
              {/* Using a placeholder since direct SVG import might not work in Next.js 16 */}
              <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
            </div>
          </div>
          <div className="absolute blur-[500px] right-[-300px] bottom-[-300px] w-[617px] h-[617px] bg-primary rounded-[100%] z-[-1]" />
          <div className="max-w-7xl w-full mx-auto max-h-[40%] flex flex-col justify-center items-center text-center grow text-white ">
            {main}
          </div>
        </section>
        {sub && (
          <div
            className={cn(
              "absolute  bottom-[0%] translate-y-[60%] z-1 inset-x-0",
              subContainerClassName
            )}
          >
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroWrapper;
