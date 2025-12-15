import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface OrderHeaderProps {
  orderId: string;
}

export function OrderHeader({ orderId }: OrderHeaderProps) {
  const router = useRouter();

  return (
    <>
      {/* Breadcrumb navigation */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.push("/dashboard/orders")}
          className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Order List
        </button>
        <span className="mx-2 text-neutral-500">/</span>
        <span className="text-sm font-medium text-neutral-900">
          Order Details
        </span>
      </div>

      {/* Order Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#20483f]">
            Order Management
          </h1>
          <div className="text-sm text-neutral-500 mt-1">
            Dashboard / Order List / Order #{orderId}
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print Order
          </Button>
        </div>
      </div>
    </>
  );
}
