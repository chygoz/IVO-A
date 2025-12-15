// app/customers/[id]/page.tsx
import { Metadata } from "next";
import { CustomerDetail } from "@/components/customers/customer-detail";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Customer Details",
  description: "View detailed information about a customer.",
};

interface CustomerDetailPageProps {
  params: {
    id: string;
  };
}

export default function CustomerDetailPage({
  params,
}: CustomerDetailPageProps) {
  // Validate the id to prevent errors
  if (!params.id || typeof params.id !== "string") {
    notFound();
  }

  return (
    <div className="container py-10">
      <CustomerDetail customerId={params.id} />
    </div>
  );
}
