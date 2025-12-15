"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, XCircle } from "lucide-react";
import { CancellationReason } from "@/types/order";

interface PickupCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    reason: CancellationReason,
    additionalInfo: string
  ) => Promise<any>;
}

export function PickupCancelModal({
  isOpen,
  onClose,
  onSubmit,
}: PickupCancelModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState<CancellationReason>(
    CancellationReason.CUSTOMER_REQUEST
  );
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!reason) {
      setError("Please select a cancellation reason");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await onSubmit(reason, additionalInfo);
      onClose();
    } catch (error) {
      console.error("Error cancelling pickup:", error);
      setError("Failed to cancel pickup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-red-600 flex items-center">
            <XCircle className="h-5 w-5 mr-2" />
            Cancel Pickup
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
              <h3 className="font-medium text-red-800 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Warning
              </h3>
              <p className="text-sm text-red-700 mt-1">
                Cancelling a scheduled pickup may incur fees depending on the
                courier&apos;s policy. This action cannot be undone.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Reason for Cancellation <span className="text-red-500">*</span>
              </label>
              <select
                value={reason}
                onChange={(e) =>
                  setReason(e.target.value as CancellationReason)
                }
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
                required
              >
                <option value={CancellationReason.CUSTOMER_REQUEST}>
                  Customer Request
                </option>
                <option value={CancellationReason.ADDRESS_ISSUE}>
                  Address Issue
                </option>
                <option value={CancellationReason.BUSINESS_CLOSED}>
                  Business Closed
                </option>
                <option value={CancellationReason.DELIVERY_CONSTRAINT}>
                  Delivery Constraint
                </option>
                <option value={CancellationReason.SYSTEM_ERROR}>
                  System Error
                </option>
                <option value={CancellationReason.OTHER}>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Additional Information
              </label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                rows={4}
                placeholder="Please provide any additional details about the cancellation..."
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
              ></textarea>

              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" variant="destructive" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Processing...
                </>
              ) : (
                "Confirm Cancellation"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
