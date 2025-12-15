"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wallet } from "@/types/account";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface WalletSwitcherProps {
  wallets: Wallet[];
  currentCurrency?: string;
}

const WalletSwitcher: React.FC<WalletSwitcherProps> = ({
  wallets,
  currentCurrency = "NGN",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCurrencyChange = (currency: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("currency", currency);
    router.push(`${pathname}?${params.toString()}`);
  };

  const currencyIcons = {
    NGN: (
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* NGN flag SVG content */}
      </svg>
    ),
    USD: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* USD flag SVG content */}
      </svg>
    ),
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {currencyIcons[currentCurrency as keyof typeof currencyIcons]}
          <span>{currentCurrency} Wallet</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {wallets.map((wallet) => (
          <DropdownMenuItem
            key={wallet.currency}
            onClick={() => handleCurrencyChange(wallet.currency)}
            className="flex items-center gap-2 cursor-pointer"
          >
            {currencyIcons[wallet.currency as keyof typeof currencyIcons]}
            <span>
              {wallet.currency} Wallet ({wallet.currency === "NGN" ? "₦" : "$"}
              {wallet.availableBalance.toLocaleString()})
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletSwitcher;
