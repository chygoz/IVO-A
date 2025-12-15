"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils-alt";
import { ExternalLink, MapPin, Package, Truck } from "lucide-react";

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackingData: any;
  isLoading: boolean;
  trackingId?: string;
}

export function TrackingModal({
  isOpen,
  onClose,
  trackingData,
  isLoading,
  trackingId,
}: TrackingModalProps) {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in transit":
      case "in-transit":
        return "bg-blue-100 text-blue-800";
      case "exception":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#20483f]">
            Shipment Tracking
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="py-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#20483f] mx-auto"></div>
            <p className="mt-2 text-neutral-600">Loading tracking details...</p>
          </div>
        ) : trackingData ? (
          <div className="py-4">
            <div className="bg-neutral-50 p-4 rounded-lg mb-6 border border-neutral-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-700">
                    Tracking Number
                  </h3>
                  <p className="text-sm font-medium">
                    {trackingData.shipments?.[0]?.shipmentTrackingNumber ||
                      trackingId ||
                      "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-700">
                    Status
                  </h3>
                  <p className="text-sm font-medium">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        trackingData.shipments?.[0]?.status
                      )}`}
                    >
                      {trackingData.shipments?.[0]?.status || "Unknown"}
                    </span>
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-neutral-700">
                    Ship Date
                  </h3>
                  <p className="text-sm">
                    {trackingData.shipments?.[0]?.shipmentTimestamp
                      ? formatDate(
                          trackingData.shipments[0].shipmentTimestamp,
                          "dd MMM yyyy, HH:mm"
                        )
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-neutral-700">
                    Est. Delivery
                  </h3>
                  <p className="text-sm">
                    {trackingData.shipments?.[0]?.estimatedDeliveryTimeframe
                      ?.estimatedThrough
                      ? formatDate(
                          trackingData.shipments[0].estimatedDeliveryTimeframe
                            .estimatedThrough,
                          "dd MMM yyyy"
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-neutral-900 mb-3">
              Tracking History
            </h3>

            <div className="space-y-4">
              {trackingData.shipments?.[0]?.events?.map(
                (event: any, index: number) => (
                  <div key={index} className="border-l-2 pl-4 pb-2 relative">
                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-[#20483f] border-2 border-white"></div>
                    <div className="text-sm">
                      <p className="font-medium text-neutral-900">
                        {event.status}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {event.timestamp
                          ? formatDate(event.timestamp, "dd MMM yyyy, HH:mm")
                          : "N/A"}
                      </p>
                      <div className="flex items-center text-xs text-neutral-600 mt-1">
                        <MapPin className="h-3 w-3 mr-1 text-neutral-400" />
                        {event.location?.address?.addressLocality ||
                          "Unknown location"}
                        ,
                        {event.location?.address?.countryCode &&
                          ` ${event.location.address.countryCode}`}
                      </div>
                      <p className="text-xs text-neutral-700 mt-1">
                        {event.description}
                      </p>
                    </div>
                  </div>
                )
              )}

              {(!trackingData.shipments?.[0]?.events ||
                trackingData.shipments[0].events.length === 0) && (
                <div className="text-center py-4">
                  <Package className="h-12 w-12 mx-auto text-neutral-300" />
                  <p className="mt-2 text-neutral-500">
                    No tracking events found
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <Truck className="h-12 w-12 mx-auto text-neutral-300" />
            <p className="mt-2 text-neutral-600">
              No tracking information available
            </p>
          </div>
        )}

        <DialogFooter>
          {trackingId && (
            <a
              href={`https://www.dhl.com/track?tracking-id=${trackingId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-10 rounded-md bg-[#20483f] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#16322c] focus:outline-none focus:ring-2 focus:ring-[#20483f] focus:ring-offset-2"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on DHL
            </a>
          )}
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
