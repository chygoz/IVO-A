"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

type PartnerKeyProps = {
  currentPartner: string;
};

function PartnerKey({ currentPartner }: PartnerKeyProps) {
  return (
    <div>
      <label>Partner Key</label>
    </div>
  );
}

export default PartnerKey;
