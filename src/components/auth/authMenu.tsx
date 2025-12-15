"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { doLogout } from "@/actions/login";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
function AuthMenu() {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        className="bg-white p-3 rounded-md border border-solid border-secondary"
        asChild
      >
        <Link href="/dashboard">Back to Dashboard</Link>
      </Button>
      <Button
        onClick={() => {
          doLogout(pathname.includes("/dashboard") ? "/" : pathname);
          queryClient.clear();
        }}
        className="bg-primary p-3 rounded-md text-white"
      >
        Logout
      </Button>
    </div>
  );
}

export default AuthMenu;
