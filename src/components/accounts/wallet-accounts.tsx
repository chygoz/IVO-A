"use client";

import React from "react";
import QuickActions from "./quick-actions";
import { Wallet } from "@/types/account";

interface WalletActionsProps {
  wallet: Wallet | null;
  currency: string;
}

const WalletActions: React.FC<WalletActionsProps> = ({ wallet, currency }) => {
  return (
    <div className="space-y-8">
      <QuickActions currency={currency} wallet={wallet} />
    </div>
  );
};

export default WalletActions;
