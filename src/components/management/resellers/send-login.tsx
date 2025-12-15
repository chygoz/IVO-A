import { checkResellersToSendLogin } from "@/actions/resellers";
import React from "react";
import ResellerLoginBadge from "./send-action";

async function SendResellerLogin() {
  const response = await checkResellersToSendLogin();

  // If no users need login details, don't render anything
  if (!response.data.count) return null;

  return <ResellerLoginBadge count={response.data.count} />;
}

export default SendResellerLogin;
