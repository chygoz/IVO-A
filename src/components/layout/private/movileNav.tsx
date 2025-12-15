"use client";
import React, { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import RenderSideNav from "./RenderSiderNav";
import { Session } from "next-auth";

type MobileNavProps = {
  session: Session | null;
};

function MobileNav({ session }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={(value) => setOpen(value)}>
      <SheetTrigger asChild>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="27"
            viewBox="0 0 26 27"
            fill="none"
          >
            <path
              d="M3.63574 19.875L17.8281 19.875"
              stroke="black"
              strokeWidth="1.57692"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.58789 13.5664H22.511"
              stroke="black"
              strokeWidth="1.57692"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.58789 7.25977H22.511"
              stroke="black"
              strokeWidth="1.57692"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent close side="left" className="h-full w-full pt-0">
        <SheetHeader className="hidden">
          <SheetTitle>Mobile Nav</SheetTitle>
          <SheetDescription>Mobile navigation menu</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <div className="py-2.5 px-4 border-b border-b-solid border-b-gray-300">
            <button onClick={() => setOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <RenderSideNav
            closeModal={() => setOpen(false)}
            color
            session={session}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
