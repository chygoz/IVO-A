import { createContext } from "react";

export interface Partner {
  _id: string;
  name: string;
  description: string;
}

export const PartnerContext = createContext<{
  partner: Partner | null;
  setPartner: (partner: Partner) => void;
}>({
  partner: null,
  setPartner: () => {},
});
