// src/components/order-detail/order-cancellation.tsx
import {
  OrderDetailType,
  OrderCancellation,
  CancellationReason,
} from "@/types/order";
import { formatDate } from "@/lib/utils-alt";
import { Ban, AlertCircle, RefreshCw } from "lucide-react";

interface OrderCancellationProps {
  order: OrderDetailType;
}

export function OrderCancellationInfo({ order }: OrderCancellationProps) {
  if (!order.cancellation) {
    return null;
  }

  const { cancellation } = order;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="font-semibold text-red-600 text-lg mb-4 flex items-center">
        <Ban className="h-5 w-5 mr-2" />
        Order Cancellation
      </h2>

      <div className="p-4 bg-red-50 rounded-lg border border-red-100">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-red-700">Reason:</span>
            <span className="text-sm text-red-800">
              {formatCancellationReason(cancellation.reason)}
            </span>
          </div>

          {cancellation.additionalInfo && (
            <div>
              <span className="text-sm font-medium text-red-700">
                Additional Information:
              </span>
              <p className="text-sm text-red-800 mt-1">
                {cancellation.additionalInfo}
              </p>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-sm font-medium text-red-700">
              Cancelled On:
            </span>
            <span className="text-sm text-red-800">
              {formatDate(cancellation.cancelledAt)}
            </span>
          </div>

          {cancellation.refundInfo && (
            <div className="pt-3 border-t border-red-200">
              <span className="text-sm font-medium text-red-700">
                Refund Status:
              </span>
              <div className="mt-2">
                <div className="flex justify-between">
                  <span className="text-xs text-red-700">Amount:</span>
                  <span className="text-xs text-red-800">
                    {cancellation.refundInfo.currency}{" "}
                    {cancellation.refundInfo.amount}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-red-700">Status:</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      cancellation.refundInfo.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : cancellation.refundInfo.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {cancellation.refundInfo.status.charAt(0).toUpperCase() +
                      cancellation.refundInfo.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-red-700">Refund Date:</span>
                  <span className="text-xs text-red-800">
                    {formatDate(cancellation.refundInfo.refundedAt)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {cancellation.canReattempt && (
            <div className="flex items-center text-[#20483f] text-sm mt-3 pt-3 border-t border-red-200">
              <RefreshCw className="h-4 w-4 mr-2" />
              This order can be attempted again.
            </div>
          )}

          {cancellation.shouldRestockInventory && (
            <div className="flex items-center text-[#20483f] text-sm mt-1">
              <AlertCircle className="h-4 w-4 mr-2" />
              Inventory has been restocked.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to format cancellation reasons for display
function formatCancellationReason(reason: CancellationReason): string {
  switch (reason) {
    case CancellationReason.CUSTOMER_REQUEST:
      return "Customer Request";
    case CancellationReason.ADDRESS_ISSUE:
      return "Address Issue";
    case CancellationReason.BUSINESS_CLOSED:
      return "Business Closed";
    case CancellationReason.DELIVERY_CONSTRAINT:
      return "Delivery Constraint";
    case CancellationReason.OUT_OF_STOCK:
      return "Out of Stock";
    case CancellationReason.PAYMENT_FAILED:
      return "Payment Failed";
    case CancellationReason.SYSTEM_ERROR:
      return "System Error";
    case CancellationReason.OTHER:
      return "Other";
    default:
      return reason;
  }
}
