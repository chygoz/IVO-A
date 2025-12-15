"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type MobileMenuPros = {
  nav: any[];
};

function MobileMenu({ nav }: MobileMenuPros) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
          />
        </svg>
      </SheetTrigger>
      <SheetContent side="top" className="text-background !h-fit w-full">
        <nav className="flex mt-10 flex-col items-center gap-4">
          {nav.map((link) => (
            <Link
              onClick={() => setIsOpen(false)}
              className="text-secondary"
              key={link.href}
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col items-center gap-3 w-full">
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-primary p-3 rounded text-white w-full"
              asChild
            >
              <Link href="/auth/signin">Login</Link>
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-secondary p-3 rounded text-white w-full"
              asChild
            >
              <Link href="/auth/signup">Get started for free</Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
