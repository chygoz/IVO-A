import Link from "next/link";
import React, { Suspense } from "react";
import Logo from "@/components/ui/logo";
import RenderSideNav from "./RenderSiderNav";
import { auth } from "@/auth";

async function SidebarComponent() {
  const session = await auth();
  return (
    <Suspense
      fallback={
        <aside className="z-[12] hidden w-[var(--sidebar-width)] sm:flex flex-col gap-10 p-4 fixed inset-y-0 bg-white text-[#5C5F6A]">
          <div className="flex justify-center">
            <Link className="cursor-pointer" href="/">
              <div>
                <Logo color="sidebar" />
              </div>
            </Link>
          </div>
          <RenderSideNav session={null} />
        </aside>
      }
    >
      <aside className="z-[12] hidden w-[var(--sidebar-width)] sm:flex flex-col gap-10 p-4 fixed inset-y-0 bg-white text-[#5C5F6A]">
        <div className="flex justify-center">
          <Link className="cursor-pointer" href="/">
            <div>
              <Logo color="sidebar" />
            </div>
          </Link>
        </div>
        {session && <RenderSideNav session={session} />}
      </aside>
    </Suspense>
  );
}

export default SidebarComponent;
