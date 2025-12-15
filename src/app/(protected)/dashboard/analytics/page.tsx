import { Metadata } from "next";
import AnalyticsComponent from "@/components/analytics";

export const metadata: Metadata = {
  title: "Analytics | IVO Admin",
  description: "IVO analytics and performance metrics",
};

export default function AnalyticsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <AnalyticsComponent searchParams={searchParams} />;
}
