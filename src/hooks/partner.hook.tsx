import React from "react";
import { PartnerContext } from "@/contexts/partner.context";

function usePartner() {
  const context = React.useContext(PartnerContext);
  return context;
}

export default usePartner;
