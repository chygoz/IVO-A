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
import { PickupFormData } from "@/types/order";
import { Calendar, Clock, MapPin, MessageSquare } from "lucide-react";

interface PickupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: PickupFormData) => Promise<any>;
}

export function PickupModal({ isOpen, onClose, onSubmit }: PickupModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data: PickupFormData = {
      pickupDate: formData.get("pickupDate") as string,
      pickupTime: formData.get("pickupTime") as string,
      closeTime: formData.get("closeTime") as string,
      location: formData.get("location") as string,
      locationType: formData.get("locationType") as "business" | "residence",
      specialInstructions: formData.get("specialInstructions") as string,
    };

    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Error scheduling pickup:", error);
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
          <DialogTitle className="text-xl font-semibold text-[#20483f]">
            Schedule DHL Pickup
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-neutral-700">
                <Calendar className="h-4 w-4 mr-2 text-[#20483f]" />
                Pickup Date
              </label>
              <input
                type="date"
                name="pickupDate"
                required
                min={today}
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
                  name="pickupTime"
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
                  name="closeTime"
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
                />
                <p className="text-xs text-neutral-500">
                  Latest time for pickup
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-neutral-700">
                <MapPin className="h-4 w-4 mr-2 text-[#20483f]" />
                Location Description
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g., Front desk, Warehouse door"
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-neutral-700">
                <MapPin className="h-4 w-4 mr-2 text-[#20483f]" />
                Location Type
              </label>
              <select
                name="locationType"
                defaultValue="business"
                required
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
              >
                <option value="business">Business</option>
                <option value="residence">Residence</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-neutral-700">
                <MessageSquare className="h-4 w-4 mr-2 text-[#20483f]" />
                Special Instructions
              </label>
              <textarea
                name="specialInstructions"
                rows={3}
                placeholder="Any special instructions for the courier"
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
              ></textarea>
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Processing...
                </>
              ) : (
                "Schedule Pickup"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
