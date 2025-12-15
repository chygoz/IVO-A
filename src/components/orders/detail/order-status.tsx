import { OrderDetailType } from "@/types/order";
import { formatDate } from "@/lib/utils-alt";
import {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";

interface OrderStatusProps {
  order: OrderDetailType;
  currentStatusIndex: number;
}

export function OrderStatus({ order, currentStatusIndex }: OrderStatusProps) {
  // Helper to find status with specific status value
  const findStatusByType = (status: string) => {
    return order.orderProgress?.find((p) => p.status === status);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-neutral-800 text-lg">
          Order Timeline
        </h2>
        <div className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {order.orderStatus.charAt(0).toUpperCase() +
            order.orderStatus.slice(1)}
        </div>
      </div>

      <div className="space-y-8">
        {/* Order Placed */}
        <div className="flex items-center">
          <div
            className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
              currentStatusIndex >= 0
                ? "bg-green-100 text-green-600"
                : "bg-neutral-100 text-neutral-400"
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
          </div>
          <div className="ml-4 flex-1">
            <h3
              className={`text-sm font-medium ${
                currentStatusIndex >= 0
                  ? "text-neutral-900"
                  : "text-neutral-500"
              }`}
            >
              Order Placed
            </h3>
            <p className="text-xs text-neutral-500">
              {findStatusByType("created")?.timestamp
                ? formatDate(findStatusByType("created")?.timestamp || "")
                : "Pending"}
            </p>
          </div>
        </div>

        {/* Processing */}
        <div className="flex items-center">
          <div
            className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
              currentStatusIndex >= 1
                ? "bg-green-100 text-green-600"
                : "bg-neutral-100 text-neutral-400"
            }`}
          >
            <Package className="h-4 w-4" />
          </div>
          <div className="ml-4 flex-1">
            <h3
              className={`text-sm font-medium ${
                currentStatusIndex >= 1
                  ? "text-neutral-900"
                  : "text-neutral-500"
              }`}
            >
              Processing
            </h3>
            <p className="text-xs text-neutral-500">
              {findStatusByType("processing")?.timestamp
                ? formatDate(findStatusByType("processing")?.timestamp || "")
                : currentStatusIndex >= 1
                ? "In Progress"
                : "Pending"}
            </p>
          </div>
        </div>

        {/* Packed */}
        <div className="flex items-center">
          <div
            className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
              currentStatusIndex >= 2
                ? "bg-green-100 text-green-600"
                : "bg-neutral-100 text-neutral-400"
            }`}
          >
            <Package className="h-4 w-4" />
          </div>
          <div className="ml-4 flex-1">
            <h3
              className={`text-sm font-medium ${
                currentStatusIndex >= 2
                  ? "text-neutral-900"
                  : "text-neutral-500"
              }`}
            >
              Packed
            </h3>
            <p className="text-xs text-neutral-500">
              {findStatusByType("packed")?.timestamp
                ? formatDate(findStatusByType("packed")?.timestamp || "")
                : "Pending"}
            </p>
          </div>
        </div>

        {/* Pickup Scheduled - Only show if this status exists */}
        {findStatusByType("pickup_scheduled") && (
          <div className="flex items-center">
            <div
              className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600`}
            >
              <Calendar className="h-4 w-4" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-neutral-900">
                Pickup Scheduled
              </h3>
              <p className="text-xs text-neutral-500">
                {formatDate(
                  findStatusByType("pickup_scheduled")?.timestamp || ""
                )}
              </p>
              {findStatusByType("pickup_scheduled")?.message && (
                <p className="text-xs text-blue-600 mt-1">
                  {findStatusByType("pickup_scheduled")?.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Pickup Cancelled - Only show if this status exists */}
        {findStatusByType("pickup_cancelled") && (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-red-100 text-red-600">
              <XCircle className="h-4 w-4" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-neutral-900">
                Pickup Cancelled
              </h3>
              <p className="text-xs text-neutral-500">
                {formatDate(
                  findStatusByType("pickup_cancelled")?.timestamp || ""
                )}
              </p>
              {findStatusByType("pickup_cancelled")?.message && (
                <p className="text-xs text-red-600 mt-1">
                  Reason: {findStatusByType("pickup_cancelled")?.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Shipping */}
        <div className="flex items-center">
          <div
            className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
              currentStatusIndex >= 3
                ? "bg-green-100 text-green-600"
                : "bg-neutral-100 text-neutral-400"
            }`}
          >
            <Truck className="h-4 w-4" />
          </div>
          <div className="ml-4 flex-1">
            <h3
              className={`text-sm font-medium ${
                currentStatusIndex >= 3
                  ? "text-neutral-900"
                  : "text-neutral-500"
              }`}
            >
              Shipping
            </h3>
            <p className="text-xs text-neutral-500">
              {findStatusByType("shipped")?.timestamp
                ? formatDate(findStatusByType("shipped")?.timestamp || "")
                : "Pending"}
            </p>
            {findStatusByType("shipped")?.trackingInfo && (
              <p className="text-xs text-blue-600 mt-1">
                Tracking:{" "}
                {findStatusByType("shipped")?.trackingInfo?.trackingId}
              </p>
            )}
          </div>
        </div>

        {/* Delivered or Cancelled */}
        {currentStatusIndex !== 5 ? (
          <div className="flex items-center">
            <div
              className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                currentStatusIndex >= 4
                  ? "bg-green-100 text-green-600"
                  : "bg-neutral-100 text-neutral-400"
              }`}
            >
              <CheckCircle className="h-4 w-4" />
            </div>
            <div className="ml-4 flex-1">
              <h3
                className={`text-sm font-medium ${
                  currentStatusIndex >= 4
                    ? "text-neutral-900"
                    : "text-neutral-500"
                }`}
              >
                Delivered
              </h3>
              <p className="text-xs text-neutral-500">
                {findStatusByType("delivered")?.timestamp
                  ? formatDate(findStatusByType("delivered")?.timestamp || "")
                  : "Pending"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-red-100 text-red-600">
              <XCircle className="h-4 w-4" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-neutral-900">
                Cancelled
              </h3>
              <p className="text-xs text-neutral-500">
                {findStatusByType("cancelled")?.timestamp
                  ? formatDate(findStatusByType("cancelled")?.timestamp || "")
                  : ""}
              </p>
              {findStatusByType("cancelled")?.message && (
                <p className="text-xs text-neutral-600 mt-1">
                  Reason: {findStatusByType("cancelled")?.message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
