import { getAllBanks } from "@/actions/accounts";
import { auth } from "@/auth";
import NewWithdrawAccount from "@/components/accounts/withdraw-accounts/new";
import React from "react";

async function NewWithdrawalAccountPage() {
  const [session, response] = await Promise.all([auth(), getAllBanks()]);

  const banks = response.data || [];

  if (!session) return null;

  return <NewWithdrawAccount session={session} banks={banks} />;
}

export default NewWithdrawalAccountPage;
