"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import Link from "next/link";
import { RequestPayout } from "./withdraw";
import { Wallet } from "@/types/account";
import { useToast } from "@/components/ui/use-toast";

interface QuickActionsProps {
  currency?: string;
  wallet?: Wallet | null;
}

function QuickActions({ currency = "NGN", wallet }: QuickActionsProps) {
  const { toast } = useToast();

  // Define account details based on currency
  const accountDetails = {
    NGN: {
      accountNumber: "7822139222",
      bankName: "Wema Bank PLC",
      accountName: "Flutterwave/Oy Ajike",
    },
    USD: {
      accountNumber: "USD8472139",
      bankName: "Chase Bank",
      accountName: "Flutterwave/Oy Ajike",
    },
  };

  const currentAccount =
    accountDetails[currency as keyof typeof accountDetails] ||
    accountDetails.NGN;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(currentAccount.accountNumber);
    toast({
      title: "Account number copied!",
      description: "The account number has been copied to your clipboard.",
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">Quick Action</h3>
        <div className="text-sm text-gray-500">
          {wallet && (
            <span>
              Current {currency} Balance: {currency === "NGN" ? "₦" : "$"}
              {wallet.availableBalance.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Fund your wallet card */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Fund your {currency} wallet
            </CardTitle>
            <CardDescription className="text-gray-500">
              Explore a seemly easy way of adding funds to your {currency}{" "}
              wallet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
              <div>
                <p className="text-xl font-medium">
                  {currentAccount.accountNumber}
                </p>
                <p className="text-sm text-gray-500">
                  {currentAccount.bankName} - {currentAccount.accountName}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleCopyAccount}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Withdraw funds card */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Withdraw funds from {currency} wallet
            </CardTitle>
            <CardDescription className="text-gray-500">
              You can easily withdraw your funds directly to your bank
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RequestPayout currency={currency} />
          </CardContent>
        </Card>

        {/* Manage withdrawal accounts card */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Manage your Withdrawal Accounts
            </CardTitle>
            <CardDescription className="text-gray-500">
              You can add withdrawal accounts for {currency} below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" asChild>
              <Link
                href={`/dashboard/accounts/withdraw-accounts?currency=${currency}`}
              >
                Manage Accounts
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default QuickActions;
