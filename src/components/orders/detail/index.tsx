"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageWrapper from "@/components/ui/pageWrapper";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/hooks/use-order";
import { OrderHeader } from "./order-header";
import { CustomerInfo } from "./customer-info";
import { ShippingAddress } from "./shipping-address";
import { OrderStatus } from "./order-status";
import { PickupDetails } from "./pickup-details";
import { OrderCancellationInfo } from "./order-cancellation";
import { OrderNotes } from "./order-notes";
import { ShippingModal } from "./modals/shipping-modal";
import { PickupModal } from "./modals/pickup-modal";
import { TrackingModal } from "./modals/tracking-modal";
import { RefundModal } from "./modals/refund-modal";
import { DocumentViewer } from "./modals/document-viewer";
import { AlertCircle } from "lucide-react";
import { Toaster } from "sonner";
import { OrderActions } from "./order-actions";
import { OrderProducts } from "./order-products";
import { downloadBase64Content } from "@/lib/utils";

export default function OrderDetail() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;

  const [shippingModalOpen, setShippingModalOpen] = useState(false);
  const [pickupModalOpen, setPickupModalOpen] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [documentViewerOpen, setDocumentViewerOpen] = useState(false);
  const [documentType, setDocumentType] = useState<
    "label" | "invoice" | "other"
  >("label");
  const [documentTitle, setDocumentTitle] = useState("");

  const {
    order,
    loading,
    error,
    trackingData,
    trackingLoading,
    shippingLabelUrl,
    currentStatusIndex,
    fetchOrderDetails,
    handleStatusUpdate,
    handleCreateShipping,
    handleSchedulePickup,
    fetchTrackingDetails,
    handleRefund,
    handleCancelShipment,
    handleCancelPickup,
    handleReschedulePickup,
  } = useOrder(orderId);

  const handleOpenDocumentViewer = (type: "preview" | "download") => {
    if (!order || !order.shipmentDetails?.label) return;

    if (type === "preview") {
      setDocumentType("label");
      setDocumentTitle("Shipping Label Preview");
      setDocumentViewerOpen(true);
    } else {
      // If we want direct download without preview
      if (order.shipmentDetails.label.url) {
        // If we have a direct URL
        const a = document.createElement("a");
        a.href = order.shipmentDetails.label.url;
        a.download = `shipping-label-${order.orderId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else if (order.shipmentDetails.label.content) {
        // If we have base64 content
        const contentType =
          order.shipmentDetails.label.imageFormat === "PDF"
            ? "application/pdf"
            : "image/png";

        const filename = `shipping-label-${order.orderId}.${contentType === "application/pdf" ? "pdf" : "png"
          }`;
        downloadBase64Content(
          order.shipmentDetails.label.content,
          contentType,
          filename
        );
      }
    }
  };

  const handleOpenTrackingModal = async () => {
    await fetchTrackingDetails();
    setTrackingModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-neutral-50">
        <div className="flex-1 flex flex-col overflow-hidden p-6">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#20483f] mx-auto"></div>
              <p className="mt-2 text-neutral-600">Loading order details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-neutral-50">
        <div className="flex-1 flex flex-col overflow-hidden p-6">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
              <p className="mt-2 text-neutral-600">{error}</p>
              <button
                onClick={() => router.back()}
                className="mt-4 px-4 py-2 bg-[#20483f] text-white rounded-md hover:bg-[#16322c] focus:outline-none focus:ring-2 focus:ring-[#20483f] focus:ring-offset-2"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <PageWrapper>
      <div className="container mx-auto pb-8">
        <OrderHeader orderId={order.orderId} />

        {/* Order Details Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Order Info */}
          <div className="md:col-span-1">
            <OrderActions
              order={order}
              currentStatusIndex={currentStatusIndex}
              onStatusUpdate={handleStatusUpdate}
              onOpenShippingModal={() => setShippingModalOpen(true)}
              onOpenPickupModal={() => setPickupModalOpen(true)}
              onOpenTrackingModal={handleOpenTrackingModal}
              onCancelShipment={handleCancelShipment}
              onOpenDocumentViewer={handleOpenDocumentViewer}
              isTrackingLoading={trackingLoading}
              shippingLabelUrl={shippingLabelUrl}
            />

            <CustomerInfo order={order} />

            {order.pickupDetails && (
              <PickupDetails
                order={order}
                onCancelPickup={handleCancelPickup}
                onReschedulePickup={handleReschedulePickup}
              />
            )}

            <ShippingAddress order={order} />
          </div>

          {/* Middle and Right Columns - Products & Status */}
          <div className="md:col-span-2">
            {order.cancellation && <OrderCancellationInfo order={order} />}

            <OrderStatus
              order={order}
              currentStatusIndex={currentStatusIndex}
            />

            <OrderProducts order={order} />

            {order.notes && order.notes.length > 0 && (
              <OrderNotes order={order} />
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard/orders")}
                className="flex-1"
              >
                Back to List
              </Button>

              {order.paymentStatus !== "refunded" && (
                <Button
                  variant="destructive"
                  onClick={() => setRefundModalOpen(true)}
                  className="flex-1"
                >
                  Refund Order
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ShippingModal
        isOpen={shippingModalOpen}
        onClose={() => setShippingModalOpen(false)}
        onSubmit={handleCreateShipping}
      />

      <PickupModal
        isOpen={pickupModalOpen}
        onClose={() => setPickupModalOpen(false)}
        onSubmit={handleSchedulePickup}
      />

      <TrackingModal
        isOpen={trackingModalOpen}
        onClose={() => setTrackingModalOpen(false)}
        trackingData={trackingData}
        isLoading={trackingLoading}
        trackingId={order.shipmentTrackingId}
      />

      <RefundModal
        isOpen={refundModalOpen}
        onClose={() => setRefundModalOpen(false)}
        onSubmit={handleRefund}
        orderTotal={order.totalPrice?.value || ""}
        orderCurrency={order.totalPrice?.currency || ""}
      />

      <DocumentViewer
        isOpen={documentViewerOpen}
        onClose={() => {
          setDocumentViewerOpen(false);
        }}
        order={order}
        documentType={documentType}
        title={documentTitle}
      />

      <Toaster position="top-right" />
    </PageWrapper>
  );
}
