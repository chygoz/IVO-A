"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ShippingLabelFormData } from "@/types/order";
import { Calendar, Package, Truck, ArrowRight } from "lucide-react";

interface ShippingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ShippingLabelFormData) => Promise<any>;
  defaultSenderAddress?: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    countryCode: string;
    phone: string;
  };
}

export function ShippingModal({
  isOpen,
  onClose,
  onSubmit,
  defaultSenderAddress = {
    name: "Luxury Clothing Brand",
    address: "123 Fashion Avenue",
    city: "Lagos",
    postalCode: "100001",
    countryCode: "NG",
    phone: "+234 800 123 4567",
  },
}: ShippingModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("package");

  const goToNextTab = () => {
    if (activeTab === "package") setActiveTab("sender");
    else if (activeTab === "sender") setActiveTab("shipping");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data: ShippingLabelFormData = {
      senderName: formData.get("senderName") as string,
      senderAddress: formData.get("senderAddress") as string,
      senderCity: formData.get("senderCity") as string,
      senderPostalCode: formData.get("senderPostalCode") as string,
      senderCountryCode: formData.get("senderCountryCode") as string,
      senderPhone: formData.get("senderPhone") as string,
      weight: parseFloat(formData.get("weight") as string),
      length: parseFloat(formData.get("length") as string),
      width: parseFloat(formData.get("width") as string),
      height: parseFloat(formData.get("height") as string),
      serviceType: formData.get("serviceType") as string,
      shippingDate: formData.get("shippingDate") as string,
    };

    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Error creating shipping label:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for the date input min value
  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#20483f]">
            Create Shipping Label
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs
            defaultValue="package"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="package" className="flex items-center">
                <Package className="h-4 w-4 mr-2" />
                Package Info
              </TabsTrigger>
              <TabsTrigger value="sender" className="flex items-center">
                <Truck className="h-4 w-4 mr-2" />
                Sender Details
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Shipping Options
              </TabsTrigger>
            </TabsList>

            {/* Package Info Tab */}
            <TabsContent value="package" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Package Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    step="0.1"
                    required
                    min="0.1"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    name="length"
                    step="0.1"
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    name="width"
                    step="0.1"
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    step="0.1"
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 text-right">
                <Button
                  type="button"
                  onClick={goToNextTab}
                  className="flex items-center"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            {/* Sender Details Tab */}
            <TabsContent value="sender" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    required
                    defaultValue={defaultSenderAddress.name}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="senderAddress"
                    required
                    defaultValue={defaultSenderAddress.address}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="senderCity"
                    required
                    defaultValue={defaultSenderAddress.city}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="senderPostalCode"
                    required
                    defaultValue={defaultSenderAddress.postalCode}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Country Code
                  </label>
                  <input
                    type="text"
                    name="senderCountryCode"
                    required
                    defaultValue={defaultSenderAddress.countryCode}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="senderPhone"
                    required
                    defaultValue={defaultSenderAddress.phone}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 text-right">
                <Button
                  type="button"
                  onClick={goToNextTab}
                  className="flex items-center"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            {/* Shipping Options Tab */}
            <TabsContent value="shipping" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Shipping Date
                  </label>
                  <input
                    type="date"
                    name="shippingDate"
                    required
                    min={today}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Service Type
                  </label>
                  <select
                    name="serviceType"
                    required
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20483f] focus:border-[#20483f] sm:text-sm"
                  >
                    <option value="EXPRESS">DHL Express</option>
                    <option value="ECONOMY">DHL Economy</option>
                    <option value="DOMESTIC">DHL Domestic</option>
                  </select>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6 flex justify-between">
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
              disabled={isLoading || activeTab !== "shipping"}
              className={
                activeTab !== "shipping" ? "opacity-50 cursor-not-allowed" : ""
              }
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Processing...
                </>
              ) : (
                "Create Shipping Label"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
