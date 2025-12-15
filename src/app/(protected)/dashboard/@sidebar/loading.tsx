import RenderSideNav from "@/components/layout/private/RenderSiderNav";
import Logo from "@/components/ui/logo";
import Link from "next/link";
import React from "react";

function LoadingPage() {
  return (
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
  );
}

export default LoadingPage;
