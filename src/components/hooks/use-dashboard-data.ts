// hooks/use-dashboard-data.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardData, TimeRange } from "../dashboard/types";
import { toast } from "@/components/hooks/use-toast";
import { getDashboardAnalytics } from "@/actions/analytics";

const fetchDashboardData = async (timeRange: TimeRange) => {
  try {
    const data = await getDashboardAnalytics({ timeRange });
    if (!data?.success) {
      throw new Error(data?.message);
    }
    return data?.data as DashboardData;
  } catch (error) {
    toast.error({
      title: "Error loading dashboard data",
      description:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
    throw error;
  }
};

/**
 * Custom hook to fetch all dashboard data using Tanstack Query
 */
export function useDashboardData(timeRange: TimeRange) {
  return useQuery<DashboardData, Error>({
    queryKey: ["dashboard", timeRange],
    queryFn: () => fetchDashboardData(timeRange),
    retry: false,
    staleTime: 60000,
  });
}

/**
 * Hook for fetching only summary cards data
 */
export function useSummaryCardsData(timeRange: TimeRange) {
  return useQuery<DashboardData, Error, DashboardData["summaryCards"]>({
    queryKey: ["dashboard", timeRange],
    queryFn: () => fetchDashboardData(timeRange),
    select: (data) => data.summaryCards,
    retry: false,
    staleTime: 60000,
  });
}

/**
 * Hook for fetching only sales data
 */
export function useSalesData(timeRange: TimeRange) {
  return useQuery<DashboardData, Error, DashboardData["salesData"]>({
    queryKey: ["dashboard", timeRange],
    queryFn: () => fetchDashboardData(timeRange),
    select: (data) => data.salesData,
    retry: false,
    staleTime: 60000,
  });
}

/**
 * Hook for fetching only categories data
 */
export function useDashboardCategoriesData(timeRange: TimeRange) {
  return useQuery<DashboardData, Error, DashboardData["categories"]>({
    queryKey: ["dashboard", timeRange],
    queryFn: () => fetchDashboardData(timeRange),
    select: (data) => data.categories,
    retry: false,
    staleTime: 60000,
  });
}

/**
 * Hook for fetching only recent orders data
 */
export function useRecentOrdersData(timeRange: TimeRange) {
  return useQuery<DashboardData, Error, DashboardData["recentOrders"]>({
    queryKey: ["dashboard", timeRange],
    queryFn: () => fetchDashboardData(timeRange),
    select: (data) => data.recentOrders,
    retry: false,
    staleTime: 60000,
  });
}

/**
 * Hook for fetching only order status data
 */
export function useOrderStatusData(timeRange: TimeRange) {
  return useQuery<DashboardData, Error, DashboardData["orderStatus"]>({
    queryKey: ["dashboard", timeRange],
    queryFn: () => fetchDashboardData(timeRange),
    select: (data) => data.orderStatus,
    retry: false,
    staleTime: 60000,
  });
}
