// src/components/order-detail/modals/refund-modal.tsx
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
import { AlertCircle } from "lucide-react";

interface RefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => Promise<any>;
  orderTotal: string;
  orderCurrency: string;
}

export function RefundModal({
  isOpen,
  onClose,
  onSubmit,
  orderTotal,
  orderCurrency,
}: RefundModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!reason.trim()) {
      setError("Please provide a reason for the refund");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await onSubmit(reason);
      onClose();
    } catch (error) {
      console.error("Error processing refund:", error);
      setError("Failed to process refund. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#20483f] flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
            Process Refund
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
              <h3 className="font-medium text-red-800 text-sm">Attention</h3>
              <p className="text-sm text-red-700 mt-1">
                You are about to process a full refund of {orderCurrency}{" "}
                {orderTotal} for this order. This action cannot be undone.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Reason for Refund <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                placeholder="Please provide a detailed reason for the refund..."
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
                required
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
                "Process Refund"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
