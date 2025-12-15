"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const menuItems = [
  { name: "Pending", href: "/dashboard/resellers/requests" },
  { name: "Completed", href: "/dashboard/resellers/requests/completed" },
];

function RequestMenu() {
  const pathname = usePathname();
  return (
    <div className="border-b-2 border-b-solid border-b-gray-200">
      <ul className="flex items-center">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "py-2 px-4 block font-medium",
                pathname === item.href
                  ? "border-b-2 border-b-solid border-b-teal-500"
                  : ""
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RequestMenu;
