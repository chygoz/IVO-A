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
import { Calendar, Clock, RefreshCw } from "lucide-react";

interface PickupRescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    pickupDate: string,
    pickupTime: string,
    closeTime: string
  ) => Promise<any>;
  currentPickupDate: string;
}

export function PickupRescheduleModal({
  isOpen,
  onClose,
  onSubmit,
  currentPickupDate,
}: PickupRescheduleModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Extract default date and times from the current pickup date
  const getDefaultDate = () => {
    try {
      const date = new Date(currentPickupDate);
      return date.toISOString().split("T")[0];
    } catch (e) {
      return new Date().toISOString().split("T")[0];
    }
  };

  const getDefaultTime = () => {
    try {
      const date = new Date(currentPickupDate);
      return `${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
      ).padStart(2, "0")}`;
    } catch (e) {
      return "09:00";
    }
  };

  const [pickupDate, setPickupDate] = useState(getDefaultDate());
  const [pickupTime, setPickupTime] = useState(getDefaultTime());
  const [closeTime, setCloseTime] = useState("17:00");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    if (!pickupDate || !pickupTime || !closeTime) {
      setError("Please fill in all required fields");
      return;
    }

    // Validate that closeTime is after pickupTime
    if (closeTime <= pickupTime) {
      setError("Close time must be after pickup time");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await onSubmit(pickupDate, pickupTime, closeTime);
      onClose();
    } catch (error) {
      console.error("Error rescheduling pickup:", error);
      setError("Failed to reschedule pickup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for the date input min value
  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#20483f] flex items-center">
            <RefreshCw className="h-5 w-5 mr-2" />
            Reschedule Pickup
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-neutral-700">
                <Calendar className="h-4 w-4 mr-2 text-[#20483f]" />
                New Pickup Date
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={today}
                required
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-neutral-700">
                  <Clock className="h-4 w-4 mr-2 text-[#20483f]" />
                  Pickup Time
                </label>
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
                />
                <p className="text-xs text-neutral-500">
                  Earliest time for pickup
                </p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-neutral-700">
                  <Clock className="h-4 w-4 mr-2 text-[#20483f]" />
                  Close Time
                </label>
                <input
                  type="time"
                  value={closeTime}
                  onChange={(e) => setCloseTime(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
                />
                <p className="text-xs text-neutral-500">
                  Latest time for pickup
                </p>
              </div>
            </div>

            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
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
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#20483f] hover:bg-[#16322c]"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Processing...
                </>
              ) : (
                "Reschedule Pickup"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
