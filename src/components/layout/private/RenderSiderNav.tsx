"use client";
import Link from "next/link";
import React, { useMemo } from "react";
import { navigation } from "../navigation";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardIcon } from "@/components/icons";

type RenderSideNavProps = {
  session: Session | null;
  color?: boolean;
  closeModal?: () => void;
};

function RenderSideNav({ session, color, closeModal }: RenderSideNavProps) {
  const pathname = usePathname();
  const role = session?.current_business?.role || ""
  const filteredNavigationElements = useMemo(() => {
    return navigation
      .map((navItem) => {
        const children = navItem.children.filter((child) =>
          child.actors?.includes(role) || child.actors?.includes("all")
        );
        return {
          ...navItem,
          children,
        };
      })
      .filter((navItem) => navItem.children.length > 0);
  }, [role]);
  return (
    <nav>
      <ScrollArea className="h-screen w-full pb-40">
        <ul className="flex flex-col gap-4">
          {filteredNavigationElements.map((nav, index) => {
            if (!session) {
              return <Skeleton key={index} className="w-full h-9" />;
            }
            return (
              <li key={index.toString()}>
                <div>
                  {nav.name && (
                    <h4 className="font-semibold text-base mb-3">{nav.name}</h4>
                  )}
                  <ul className="flex flex-col gap-1">
                    {nav.children.map((child) => {
                      return (
                        <Button
                          onClick={() => {
                            if (
                              closeModal &&
                              typeof closeModal === "function"
                            ) {
                              closeModal();
                            }
                          }}
                          className={cn(
                            "bg-white text-[#99A4B5] shadow-none",
                            " hover:bg-primary hover:text-white  p-4 rounded-xl flex w-full gap-2 items-center justify-start",
                            child.href !== "/dashboard" &&
                              pathname.includes(child.href)
                              ? "bg-primary text-white"
                              : "",
                            child.href === "/dashboard" &&
                            pathname === "/dashboard" &&
                            "bg-primary text-white"
                          )}
                          key={child.href}
                          asChild
                        >
                          <Link href={child.href}>
                            {<child.icon />} {child.name}
                          </Link>
                        </Button>
                      );
                    })}
                  </ul>
                  <Separator className="my-2" />
                </div>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </nav>
  );
}

export default RenderSideNav;
