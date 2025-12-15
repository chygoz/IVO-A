import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const menus = [
  { name: "Profile", href: "/dashboard/profile" },
  { name: "Support", href: "/dashboard/profile/support" },
  { name: "Legal", href: "/dashboard/profile/legal" },
];

function Menus() {
  return (
    <div className="w-[100px]">
      <ul className="flex sm:flex-col gap-[18px]">
        {menus.map((menu, index) => (
          <li key={index.toString()}>
            <Button
              className="w-full bg-[#DFE3E8] text-black text-start hover:text-white"
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
