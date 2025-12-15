import { OrderDetailType } from "@/types/order";
import { MapPin, Copy } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import { useToast } from "@/lib/toast";

interface ShippingAddressProps {
  order: OrderDetailType;
}

export function ShippingAddress({ order }: ShippingAddressProps) {
  const { toast } = useToast();

  const formatAddress = () => {
    const { firstName, lastName, address, city, state, zip, country } =
      order.shipping;
    return `${firstName} ${lastName}\n${address}\n${city}, ${state} ${zip}\n${country}`;
  };

  const handleCopyAddress = async () => {
    const result = await copyToClipboard(formatAddress());
    if (result) {
      toast({
        title: "Address copied",
        description: "Shipping address has been copied to clipboard.",
        variant: "success",
      });
    } else {
      toast({
        title: "Copy failed",
        description: "Failed to copy address to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#20483f] text-lg flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-neutral-600" />
          Shipping Address
        </h2>
        <button
          onClick={handleCopyAddress}
          className="text-xs flex items-center text-neutral-600 hover:text-[#20483f]"
        >
          <Copy className="h-3 w-3 mr-1" />
          Copy
        </button>
      </div>

      <div className="text-sm text-neutral-800">
        <p className="font-medium">
          {order?.shipping?.firstName} {order.shipping?.lastName}
        </p>
        <p className="mt-1">{order?.shipping?.address}</p>
        <p className="mt-1">
          {order.shipping?.city}, {order.shipping?.state} {order.shipping?.zip}
        </p>
        <p className="mt-1">{order.shipping?.country}</p>

        <div className="mt-3 pt-3 border-t border-dashed border-neutral-200">
          <div className="flex items-center">
            <p className="font-medium text-neutral-600">Phone:</p>
            <p className="ml-2">{order.shipping?.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
