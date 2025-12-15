import React, { Suspense } from "react";
import { UserMenu } from "./user/UserMenu";
import MobileNav from "./mobile";
import { Card } from "@/components/ui/card";
import { auth } from "@/auth";
import { Skeleton } from "@/components/ui/skeleton";
import NotificationBell from "@/components/notification/notification-bell";

async function Navbar() {
  const session = await auth();
  return (
    <Suspense
      fallback={
        <div className="hidden sm:block fixed inset-x-0 top-0 md:pl-[var(--sidebar-width)] z-10">
          <div className="h-20 flex items-center px-6 text-black bg-white border border-solid border-[#D1D1D1]">
            <Skeleton className="h-[30px] w-[60px] rounded-md" />
            <Skeleton className="size-6 rounded-full ml-auto " />
          </div>
        </div>
      }
    >
      <div className="hidden sm:block fixed inset-x-0 top-0 md:pl-[var(--sidebar-width)] z-10">
        <header className="p-4 h-20 text-black bg-white border border-solid border-[#D1D1D1]">
          <div className="flex items-center">
            <p className="text-2xl font-semibold">Super Admin</p>
            <div className="ml-auto w-fit flex item-center gap-2">
              <NotificationBell />
              {<UserMenu session={session} />}
            </div>
          </div>
        </header>
      </div>
      <Card className="block sm:hidden fixed inset-x-5 top-[20px] h-[60px] z-10 rounded-[48px] p-3">
        <MobileNav session={session} />
      </Card>
    </Suspense>
  );
}

export default Navbar;
