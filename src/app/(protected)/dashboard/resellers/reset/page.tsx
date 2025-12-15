
import { Metadata } from "next";
import ResellerReset from "@/components/resellers/reseller-reset";

export const metadata: Metadata = {
  title: "Reseller Reset | IVO Admin",
  description: "Reset reseller accounts",
};

export default function ResellerResetPage() {
  return <ResellerReset />;
}
