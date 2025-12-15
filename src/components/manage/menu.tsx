"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
const menus = [
  { name: "Users", href: "/dashboard/manage" },
  { name: "Invites", href: "/dashboard/manage/invites" },
  { name: "Settings", href: "/dashboard/manage/settings" },
];

function Menu() {
  const pathname = usePathname();
  return (
    <ul className="grid w-full grid-cols-3 max-w-[900px] bg-slate-100 rounded-md mb-8">
      {menus.map((menu, index) => (
        <li key={index.toString()}>
          <Button
            className={cn(
              "w-full hover:text-white",
              menu.href === pathname
                ? "bg-white text-slate-950"
                : "bg-slate-100 text-slate-500 border-none shadow-none"
            )}
            asChild
          >
            <Link href={menu.href}>{menu.name}</Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default Menu;
