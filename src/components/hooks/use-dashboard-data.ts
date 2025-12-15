// hooks/use-dashboard-data.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardData, TimeRange } from "../dashboard/types";
import { toast } from "@/hooks/use-toast";
import { getDashboardAnalytics } from "@/actions/analytics";

/**
 * Custom hook to fetch all dashboard data using Tanstack Query
 */
export function useDashboardData(timeRange: TimeRange) {
  return useQuery<DashboardData, Error>({
    queryKey: ["dashboard", timeRange],
    queryFn: async () => {
      try {
        const data = await getDashboardAnalytics({ timeRange });
        if (!data?.success) {
          throw new Error(data?.message);
        }
        return data?.data;
      } catch (error) {
        //@ts-expect-error
        toast.error({
          title: "Error loading dashboard data",
          description:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        });
        throw error;
      }
    },
  });
}

/**
 * Hook for fetching only summary cards data
 */
export function useSummaryCardsData(timeRange: TimeRange) {
  return useQuery<DashboardData["summaryCards"], Error>({
    queryKey: ["dashboard", "summaryCards", timeRange],
    queryFn: async () => {
      try {
        const data = await getDashboardAnalytics({ timeRange });
        if (!data?.success) {
          throw new Error(data?.message);
        }
        return data?.data?.summaryCards;
      } catch (error) {
        //@ts-expect-error
        toast.error({
          title: "Error loading summary data",
          description:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        });
        throw error;
      }
    },
  });
}

/**
 * Hook for fetching only sales data
 */
export function useSalesData(timeRange: TimeRange) {
  return useQuery<DashboardData["salesData"], Error>({
    queryKey: ["dashboard", "salesData", timeRange],
    queryFn: async () => {
      try {
        const data = await getDashboardAnalytics({ timeRange });
        if (!data?.success) {
          throw new Error(data?.message);
        }
        return data?.data.salesData;
      } catch (error) {
        //@ts-expect-error
        toast.error({
          title: "Error loading sales chart data",
          description:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        });
        throw error;
      }
    },
  });
}

/**
 * Hook for fetching only categories data
 */
export function useDashboardCategoriesData(timeRange: TimeRange) {
  return useQuery<DashboardData["categories"], Error>({
    queryKey: ["dashboard", "categories", timeRange],
    queryFn: async () => {
      try {
        const data = await getDashboardAnalytics({ timeRange });
        if (!data?.success) {
          throw new Error(data?.message);
        }
        return data?.data.categories;
      } catch (error) {
        //@ts-expect-error
        toast.error({
          title: "Error loading categories data",
          description:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        });
        throw error;
      }
    },
  });
}

/**
 * Hook for fetching only recent orders data
 */
export function useRecentOrdersData(timeRange: TimeRange) {
  return useQuery<DashboardData["recentOrders"], Error>({
    queryKey: ["dashboard", "recentOrders", timeRange],
    queryFn: async () => {
      try {
        const data = await getDashboardAnalytics({ timeRange });
        if (!data?.success) {
          throw new Error(data?.message);
        }
        return data?.data.recentOrders;
      } catch (error) {
        //@ts-expect-error
        toast.error({
          title: "Error loading recent orders",
          description:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        });
        throw error;
      }
    },
  });
}

/**
 * Hook for fetching only order status data
 */
export function useOrderStatusData(timeRange: TimeRange) {
  return useQuery<DashboardData["orderStatus"], Error>({
    queryKey: ["dashboard", "orderStatus", timeRange],
    queryFn: async () => {
      try {
        const data = await getDashboardAnalytics({ timeRange });
        if (!data?.success) {
          throw new Error(data?.message);
        }
        return data?.data.orderStatus;
      } catch (error) {
        //@ts-expect-error
        toast.error({
          title: "Error loading order status data",
          description:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        });
        throw error;
      }
    },
  });
}
