import { useState } from "react";
import { OrderDetailType, CancellationReason } from "@/types/order";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { formatDate } from "@/lib/utils-alt";
import { PickupCancelModal } from "./modals/pickup-cancel-modal";
import { PickupRescheduleModal } from "./modals/pickup-reschedule-modal";

interface PickupDetailsProps {
  order: OrderDetailType;
  onCancelPickup: (
    reason: CancellationReason,
    additionalInfo: string
  ) => Promise<any>;
  onReschedulePickup: (
    pickupDate: string,
    pickupTime: string,
    closeTime: string
  ) => Promise<any>;
}

export function PickupDetails({
  order,
  onCancelPickup,
  onReschedulePickup,
}: PickupDetailsProps) {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);

  if (!order.pickupDetails) {
    return null;
  }

  const { pickupDetails } = order;

  // Check if pickup can be rescheduled (not cancelled and not completed)
  const canReschedule =
    pickupDetails.status !== "cancelled" &&
    pickupDetails.status !== "completed";

  // Check if pickup can be cancelled (only if scheduled)
  const canCancel = pickupDetails.status === "scheduled";

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="font-semibold text-[#20483f] text-lg mb-4 flex items-center">
        <Calendar className="h-5 w-5 mr-2 text-neutral-600" />
        Pickup Details
        <span
          className={`ml-auto text-xs px-2 py-1 rounded-full ${
            pickupDetails.status === "scheduled"
              ? "bg-blue-100 text-blue-800"
              : pickupDetails.status === "completed"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {pickupDetails.status.charAt(0).toUpperCase() +
            pickupDetails.status.slice(1)}
        </span>
      </h2>

      <div className="space-y-4">
        {/* Pickup Scheduled Info */}
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-neutral-500 mr-2" />
          <span className="text-sm text-neutral-600">
            Scheduled for:{" "}
            {formatDate(pickupDetails.scheduledPickupDateAndTime, "PPP")}
          </span>
        </div>

        <div className="flex items-center">
          <Clock className="h-4 w-4 text-neutral-500 mr-2" />
          <span className="text-sm text-neutral-600">
            Pickup time:{" "}
            {formatDate(pickupDetails.scheduledPickupDateAndTime, "p")}
            {pickupDetails.closeTime &&
              ` - ${formatDate(pickupDetails.closeTime, "p")}`}
          </span>
        </div>

        {pickupDetails.location && (
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-neutral-500 mr-2" />
            <span className="text-sm text-neutral-600">
              {pickupDetails.location} (
              {pickupDetails.locationType || "location"})
            </span>
          </div>
        )}

        <div className="text-sm text-neutral-600">
          <span className="font-medium">Confirmation Number:</span>{" "}
          {pickupDetails.dispatchConfirmationNumber}
        </div>

        {pickupDetails.specialInstructions && (
          <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200">
            <p className="text-xs font-medium text-neutral-600 mb-1">
              Special Instructions
            </p>
            <p className="text-sm text-neutral-800">
              {pickupDetails.specialInstructions}
            </p>
          </div>
        )}

        {/* Cancellation Information (if cancelled) */}
        {pickupDetails.status === "cancelled" && pickupDetails.cancellation && (
          <div className="p-3 bg-red-50 rounded-md border border-red-100 mt-4">
            <div className="flex items-center text-red-800 text-sm font-medium mb-2">
              <XCircle className="h-4 w-4 mr-2" />
              Pickup Cancelled
            </div>
            <div className="space-y-2 text-sm text-red-700">
              <p>
                <span className="font-medium">Reason:</span>{" "}
                {formatCancellationReason(pickupDetails.cancellation.reason)}
              </p>
              {pickupDetails.cancellation.additionalInfo && (
                <p>
                  <span className="font-medium">Details:</span>{" "}
                  {pickupDetails.cancellation.additionalInfo}
                </p>
              )}
              <p>
                <span className="font-medium">Cancelled on:</span>{" "}
                {formatDate(pickupDetails.cancellation.cancelledAt)}
              </p>
              {pickupDetails.cancellation.cancellationFee !== undefined &&
                pickupDetails.cancellation.cancellationFee > 0 && (
                  <p>
                    <span className="font-medium">Cancellation Fee:</span> $
                    {pickupDetails.cancellation.cancellationFee.toFixed(2)}
                  </p>
                )}
              {pickupDetails.cancellation.canReschedule && (
                <div className="flex items-center mt-2 text-[#20483f]">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>This pickup can be rescheduled</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {(canReschedule || canCancel) && (
          <div className="flex space-x-3 mt-4">
            {canCancel && (
              <Button
                onClick={() => setCancelModalOpen(true)}
                variant="destructive"
                className="flex-1"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel Pickup
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <PickupCancelModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onSubmit={onCancelPickup}
      />

      <PickupRescheduleModal
        isOpen={rescheduleModalOpen}
        onClose={() => setRescheduleModalOpen(false)}
        onSubmit={onReschedulePickup}
        currentPickupDate={pickupDetails.scheduledPickupDateAndTime}
      />
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
