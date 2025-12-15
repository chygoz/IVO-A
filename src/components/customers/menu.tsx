"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menus = [
  { name: "Overview", href: "/dashboard/customers" },
  { name: "Users", href: "/dashboard/customers/users" },
  { name: "Partners", href: "/dashboard/customers/partners" },
];

function Menus() {
  const pathname = usePathname();
  return (
    <div className="w-full">
      <ul className="flex gap-[18px]">
        {menus.map((menu, index) => (
          <li key={index.toString()}>
            <Button
              className={cn(
                "w-full bg-[#DFE3E8] text-black text-start hover:text-white",
                pathname === menu.href ? "bg-secondary text-white" : ""
              )}
              asChild
            >
              <Link href={menu.href}>{menu.name}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menus;
