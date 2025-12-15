import { OrderDetailType } from "@/types/order";
import { User, Mail, Phone } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import { useToast } from "@/lib/toast";

interface CustomerInfoProps {
  order: OrderDetailType;
}

export function CustomerInfo({ order }: CustomerInfoProps) {
  const { toast } = useToast();

  const handleCopy = async (text: string, type: string) => {
    const result = await copyToClipboard(text);
    if (result) {
      toast({
        title: "Copied to clipboard",
        description: `${type} has been copied to clipboard.`,
        variant: "success",
      });
    } else {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="font-semibold text-[#20483f] text-lg mb-4 flex items-center border-b pb-2">
        <User className="h-5 w-5 mr-2 text-neutral-600" />
        Customer Information
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-neutral-900">
            {order.customer?.name}
          </p>
          <p className="text-xs text-neutral-500">
            Customer ID: {order.customer?._id}
          </p>
          <p className="text-xs text-neutral-500">
            Type: {order.customerType === "user" ? "Registered User" : "Guest"}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Mail className="h-4 w-4 text-neutral-400 mr-2" />
            <span className="text-sm text-neutral-600">
              {order.customer?.email}
            </span>
          </div>
          <button
            onClick={() => handleCopy(order.customer?.email, "Email")}
            className="text-xs text-[#20483f] hover:underline"
          >
            Copy
          </button>
        </div>

        {order.customer?.phone && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-neutral-400 mr-2" />
              <span className="text-sm text-neutral-600">
                {order.customer.phone}
              </span>
            </div>
            <button
              onClick={() => handleCopy(order.customer.phone || "", "Phone")}
              className="text-xs text-[#20483f] hover:underline"
            >
              Copy
            </button>
          </div>
        )}

        <div className="pt-4 border-t border-dashed border-neutral-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-medium text-neutral-500">Order Date</p>
              <p className="text-sm text-neutral-800">
                {new Date(order.orderDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-neutral-500">
                Payment Status
              </p>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.paymentStatus === "paid"
                  ? "bg-green-100 text-green-800"
                  : order.paymentStatus === "refunded"
                    ? "bg-amber-100 text-amber-800"
                    : order.paymentStatus === "failed"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
              >
                {order.paymentStatus?.charAt(0).toUpperCase() +
                  order.paymentStatus?.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
