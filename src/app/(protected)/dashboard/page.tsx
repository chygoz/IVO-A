import { Metadata } from "next";
import DashboardComponent from "@/components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | IVO Admin",
  description:
    "IVO Admin dashboard monitoring sales, orders, customers, and products",
};

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <DashboardComponent searchParams={searchParams} />;
}
