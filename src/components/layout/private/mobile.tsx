import Logo from "@/components/ui/logo";
import React from "react";
import { UserMenu } from "./user/UserMenu";
import { Session } from "next-auth";
import Link from "next/link";
import MobileNav from "./movileNav";

type MobileNavProps = {
  session: Session | null;
};

function MobileNavMain({ session }: MobileNavProps) {
  return (
    <header className="flex h-full justify-between items-center">
      <MobileNav session={session} />
      <Link href="/">
        <Logo mobile />
      </Link>
      <UserMenu className="p-0" session={session} />
    </header>
  );
}

export default MobileNavMain;
