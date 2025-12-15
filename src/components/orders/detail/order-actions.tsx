import { OrderDetailType } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Tag, Copy, Truck, Package, Download, RefreshCw } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import { useToast } from "@/lib/toast";

interface OrderActionsProps {
  order: OrderDetailType;
  currentStatusIndex: number;
  onStatusUpdate: (status: string) => Promise<void>;
  onOpenShippingModal: () => void;
  onOpenPickupModal: () => void;
  onOpenTrackingModal: () => void;
  onCancelShipment: () => Promise<any>;
  onOpenDocumentViewer: (type: "preview" | "download") => void;
  isTrackingLoading: boolean;
  shippingLabelUrl: string | null;
}

export function OrderActions({
  order,
  currentStatusIndex,
  onStatusUpdate,
  onOpenShippingModal,
  onOpenPickupModal,
  onOpenTrackingModal,
  onCancelShipment,
  onOpenDocumentViewer,
  isTrackingLoading,
  shippingLabelUrl,
}: OrderActionsProps) {
  const { toast } = useToast();

  const handleCopyTrackingId = async () => {
    if (!order.shipmentTrackingId) return;

    const result = await copyToClipboard(order.shipmentTrackingId);
    if (result) {
      toast({
        title: "Copied to clipboard",
        description: "Tracking ID has been copied to clipboard.",
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
      <h2 className="font-semibold text-neutral-800 text-lg mb-4 flex items-center">
        <Tag className="h-5 w-5 mr-2 text-neutral-600" />
        Order {order.orderId}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Order Status
        </label>
        <select
          value={
            order &&
            order?.orderProgress?.[order?.orderProgress?.length - 1].status
          }
          onChange={(e) => onStatusUpdate(e.target.value)}
          className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
        >
          <option value="processing">Processing</option>
          <option value="packed">Packed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Shipping ID
        </label>
        <div className="flex items-center">
          <input
            type="text"
            value={order.shipmentTrackingId || "Not assigned yet"}
            readOnly
            className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none sm:text-sm bg-neutral-50"
          />
          {order.shipmentTrackingId && (
            <button
              onClick={handleCopyTrackingId}
              className="ml-2 p-2 text-neutral-500 hover:text-neutral-700"
              title="Copy to clipboard"
            >
              <Copy className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Shipping Method
        </label>
        <input
          type="text"
          value="DHL Express"
          readOnly
          className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none sm:text-sm bg-neutral-50"
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mt-5">
        {order?.orderStatus !== "pending" && !order.shipmentTrackingId && (
          <Button
            onClick={onOpenShippingModal}
            className="w-full bg-[#20483f] hover:bg-[#16322c]"
          >
            <Package className="h-4 w-4 mr-2" />
            Create Shipping Label
          </Button>
        )}

        {order.shipmentTrackingId && (
          <>
            <Button
              onClick={onOpenTrackingModal}
              className="w-full bg-[#20483f] hover:bg-[#16322c] flex items-center justify-center"
              disabled={isTrackingLoading}
            >
              {isTrackingLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Truck className="h-4 w-4 mr-2" />
              )}
              Track Shipment
            </Button>

            {currentStatusIndex < 4 &&
              order.pickupDetails?.status !== "scheduled" && (
                <>
                  <Button
                    onClick={onOpenPickupModal}
                    variant="outline"
                    className="w-full border-[#20483f] text-[#20483f] hover:bg-[#f0f5f4]"
                  >
                    Schedule Pickup
                  </Button>

                  {/* Shipment cancellation button removed as per requirements */}
                </>
              )}

            {(shippingLabelUrl ||
              order.shipmentDetails?.label?.url ||
              order.shipmentDetails?.label?.content) && (
              <Button
                onClick={() => onOpenDocumentViewer("preview")}
                variant="outline"
                className="w-full flex items-center justify-center"
              >
                <Download className="h-4 w-4 mr-2" />
                View & Download Label
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
