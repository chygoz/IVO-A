"use client";
import { useState, useEffect } from "react";
import { OrderService } from "@/actions/orders";
import {
  OrderDetailType,
  ShippingLabelFormData,
  PickupFormData,
  CancellationReason,
} from "@/types/order";
import { useToast } from "@/lib/toast";

export const useOrder = (orderId: string) => {
  const [order, setOrder] = useState<OrderDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [shippingLabelUrl, setShippingLabelUrl] = useState<string | null>(null);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const { toast } = useToast();

  // Map of order status to timeline index
  const orderStatusMap: Record<string, number> = {
    created: 0,
    processing: 1,
    packed: 2,
    shipped: 3,
    delivered: 4,
    cancelled: 5,
  };

  // Fetch order details
  const fetchOrderDetails = async (id: string) => {
    setLoading(true);
    try {
      const orderData = await OrderService.getOrderById(id);
      setOrder(orderData);
      setError("");
    } catch (error: any) {
      console.error("Failed to fetch order details:", error);
      setError(error?.message || "Failed to load order details. Please try again.");
      toast({
        title: "Error",
        description: error?.message || "Failed to load order details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate the current status from progress
  useEffect(() => {
    if (order?.orderProgress) {
      const statusIndex =
        orderStatusMap[
        order.orderProgress[order.orderProgress.length - 1].status
        ] || 0;
      setCurrentStatusIndex(statusIndex);
    }
    //eslint-disable-next-line
  }, [order]);

  // Load order data
  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId);
    }
    //eslint-disable-next-line
  }, [orderId]);

  // Handle status update
  const handleStatusUpdate = async (status: string) => {
    if (!orderId || !order) return;

    try {
      await OrderService.updateOrderStatus(orderId, status);
      toast({
        title: "Status Updated",
        description: `Order status has been updated to ${status}.`,
      });
      // Refresh order details
      fetchOrderDetails(orderId);
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast({
        title: "Error",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle shipping label creation
  const handleCreateShipping = async (formData: ShippingLabelFormData) => {
    if (!orderId || !order) return;

    try {
      const { trackingId, labelUrl, } = await OrderService.createShippingLabel(
        orderId,
        formData
      );

      // Store label URL for downloading
      setShippingLabelUrl(labelUrl);

      toast({
        title: "Shipping Label Created",
        description: `Label created successfully. Tracking ID: ${trackingId}`,
      });

      // Refresh order details
      fetchOrderDetails(orderId);
      return { success: true, trackingId, labelUrl };
    } catch (error: any) {
      console.log("Failed to create shipping label:", error.message);
      toast({
        title: "Error",
        description: error.message || "Failed to create shipping label. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  // Handle scheduling pickup
  const handleSchedulePickup = async (pickupDetails: PickupFormData) => {
    if (!orderId || !order) return;

    try {
      const response = await OrderService.schedulePickup(
        orderId,
        pickupDetails
      );

      toast({
        title: "Pickup Scheduled",
        description: `Pickup scheduled successfully. Confirmation #: ${response.dispatchConfirmationNumber}`,
      });

      // Refresh order details
      fetchOrderDetails(orderId);
      return { success: true, response };
    } catch (error) {
      console.error("Failed to schedule pickup:", error);
      toast({
        title: "Error",
        description: "Failed to schedule pickup. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  // Get tracking details
  const fetchTrackingDetails = async () => {
    if (!orderId || !order || !order.shipmentTrackingId) return;

    setTrackingLoading(true);
    try {
      const data = await OrderService.getTrackingDetails(orderId);
      setTrackingData(data);
      return { success: true, data };
    } catch (error) {
      console.error("Failed to fetch tracking details:", error);
      toast({
        title: "Error",
        description: "Failed to fetch tracking details. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setTrackingLoading(false);
    }
  };

  // Handle refund
  const handleRefund = async (reason: string) => {
    if (!orderId || !reason) return;

    try {
      await OrderService.processRefund(orderId, reason);
      toast({
        title: "Refund Processed",
        description: "Order has been refunded successfully.",
      });
      // Refresh order details
      fetchOrderDetails(orderId);
      return { success: true };
    } catch (error) {
      console.error("Failed to process refund:", error);
      toast({
        title: "Error",
        description: "Failed to process refund. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  // Handle shipment cancellation
  const handleCancelShipment = async () => {
    if (!orderId || !order || !order.shipmentTrackingId) return;

    try {
      await OrderService.cancelShipment(orderId, order.shipmentTrackingId);
      toast({
        title: "Shipment Cancelled",
        description: "Shipment has been cancelled successfully.",
      });
      // Refresh order details
      fetchOrderDetails(orderId);
      return { success: true };
    } catch (error) {
      console.error("Failed to cancel shipment:", error);
      toast({
        title: "Error",
        description: "Failed to cancel shipment. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  // Cancel pickup
  const handleCancelPickup = async (
    reason: CancellationReason,
    additionalInfo: string
  ) => {
    if (!orderId || !order || !order.pickupDetails) return;

    try {
      // Extract pickup ID from the pickup details
      const pickupId = order.pickupDetails.dispatchConfirmationNumber;

      await OrderService.cancelPickup(
        orderId,
        pickupId,
        reason,
        additionalInfo
      );

      toast({
        title: "Pickup Cancelled",
        description: "The pickup has been successfully cancelled.",
      });

      // Refresh order details
      fetchOrderDetails(orderId);
      return { success: true };
    } catch (error) {
      console.error("Failed to cancel pickup:", error);
      toast({
        title: "Error",
        description: "Failed to cancel pickup. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  // Reschedule pickup
  const handleReschedulePickup = async (
    pickupDate: string,
    pickupTime: string,
    closeTime: string
  ) => {
    if (!orderId || !order || !order.pickupDetails) return;

    try {
      // Extract pickup ID from the pickup details
      const pickupId = order.pickupDetails.dispatchConfirmationNumber;

      await OrderService.reschedulePickup(
        orderId,
        pickupId,
        pickupDate,
        pickupTime,
        closeTime
      );

      toast({
        title: "Pickup Rescheduled",
        description: "The pickup has been successfully rescheduled.",
      });

      // Refresh order details
      fetchOrderDetails(orderId);
      return { success: true };
    } catch (error) {
      console.error("Failed to reschedule pickup:", error);
      toast({
        title: "Error",
        description: "Failed to reschedule pickup. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  return {
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
  };
};
