import { getAllBanks } from "@/actions/accounts";
import { auth } from "@/auth";
import NewWithdrawAccount from "@/components/accounts/withdraw-accounts/new";
import React from "react";

async function NewWithdrawalAccountPage() {
  let session = null;
  try {
    const { headers } = await import("next/headers");
    headers();
    session = await auth();
  } catch (error) {
    console.warn("Skipping authentication during prerendering:", error);
  }
  const response = await getAllBanks();

  const banks = response.data || [];

  if (!session) return null;

  return <NewWithdrawAccount session={session} banks={banks} />;
}

export default NewWithdrawalAccountPage;
