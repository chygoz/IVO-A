import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import MobileMenu from "./layout/public/mobilenav";
import { auth } from "@/auth";
import AuthMenu from "./auth/authMenu";
import Logo from "./ui/logo";

const links = [
  {
    name: "Explore",
    href: "/explore",
  },
  {
    name: "For Businesses",
    href: "/for-businesses",
  },
  {
    name: "For Players",
    href: "/players",
  },
  {
    name: "About us",
    href: "/about",
  },
];

async function Navbar() {
  const session = await auth();
  return (
    <div className="fixed inset-x-0 top-[36px] z-[11] px-4 sm:px-0">
      <div className=" bg-white max-w-7xl mx-auto w-full px-8 rounded-[60px] shadow-md">
        <header className="min-h-16  py-4   text-black flex justify-between gap-6 items-center">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-lg font-medium">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.name}
              </Link>
            ))}
          </nav>
          <nav className="hidden md:flex items-center gap-6">
            {session?.user ? (
              <AuthMenu />
            ) : (
              <div className="flex items-center gap-3">
                <Button className="bg-primary p-3 rounded text-white" asChild>
                  <Link href="/auth/signin">Log in</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-secondary p-3 rounded text-secondary"
                  asChild
                >
                  <Link href="/auth/signup?mode=players">Get Started</Link>
                </Button>
              </div>
            )}
          </nav>
          <div className="ml-auto flex md:hidden">
            <MobileMenu nav={links} />
          </div>
        </header>
      </div>
    </div>
  );
}

export default Navbar;
