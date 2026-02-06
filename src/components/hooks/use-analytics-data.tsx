// hooks/use-analytics-data.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { AnalyticsData } from "../analytics/types";
import { TimeRange } from "../dashboard/types";
import { toast } from "@/components/hooks/use-toast";
import { getAnalytics } from "@/actions/analytics";

const fetchAnalyticsData = async (timeRange: TimeRange) => {
  try {
    const data = await getAnalytics({ timeRange });
    if (!data?.success) {
      throw new Error(data?.message);
    }
    return data.data as AnalyticsData;
  } catch (error) {
    toast.error({
      title: "Error loading analytics data",
      description:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
    throw error;
  }
};

/**
 * Custom hook to fetch analytics data using Tanstack Query
 */
export function useAnalyticsData(timeRange: TimeRange) {
  return useQuery<AnalyticsData, Error>({
    queryKey: ["analytics", timeRange],
    queryFn: () => fetchAnalyticsData(timeRange),
    retry: false,
    staleTime: 60000,
  });
}

/**
 * Hook for fetching only total sales data
 */
export function useTotalSalesData(timeRange: TimeRange) {
  return useQuery<AnalyticsData, Error, AnalyticsData["totalSales"]>({
    queryKey: ["analytics", timeRange],
    queryFn: () => fetchAnalyticsData(timeRange),
    select: (data) => data.totalSales,
    retry: false,
    staleTime: 60000,
  });
}

/**
 * Hook for fetching only categories data
 */
export function useCategoriesData(timeRange: TimeRange) {
  return useQuery<AnalyticsData, Error, AnalyticsData["categories"]>({
    queryKey: ["analytics", timeRange],
    queryFn: () => fetchAnalyticsData(timeRange),
    select: (data) => data.categories,
    retry: false,
    staleTime: 60000,
  });
}

/**
 * Hook for fetching only top selling products data
 */
export function useTopSellingProductsData(timeRange: TimeRange) {
  return useQuery<AnalyticsData, Error, AnalyticsData["topSellingProducts"]>({
    queryKey: ["analytics", timeRange],
    queryFn: () => fetchAnalyticsData(timeRange),
    select: (data) => data.topSellingProducts,
    retry: false,
    staleTime: 60000,
  });
}

/**
 * Hook for fetching only sales by location data
 */
export function useSalesByLocationData(timeRange: TimeRange) {
  return useQuery<AnalyticsData, Error, AnalyticsData["salesByLocation"]>({
    queryKey: ["analytics", timeRange],
    queryFn: () => fetchAnalyticsData(timeRange),
    select: (data) => data.salesByLocation,
    retry: false,
    staleTime: 60000,
  });
}

/**
 * Hook for fetching only orders data
 */
export function useTotalOrdersData(timeRange: TimeRange) {
  return useQuery<AnalyticsData, Error, AnalyticsData["totalOrders"]>({
    queryKey: ["analytics", timeRange],
    queryFn: () => fetchAnalyticsData(timeRange),
    select: (data) => data.totalOrders,
    retry: false,
    staleTime: 60000,
  });
}

/**
 * Hook for fetching only conversion rate data
 */
export function useConversionRateData(timeRange: TimeRange) {
  return useQuery<AnalyticsData, Error, AnalyticsData["conversionRate"]>({
    queryKey: ["analytics", timeRange],
    queryFn: () => fetchAnalyticsData(timeRange),
    select: (data) => data.conversionRate,
    retry: false,
    staleTime: 60000,
  });
}

/**
 * Hook for fetching only reseller stores data
 */
export function useResellerStoresData(timeRange: TimeRange) {
  return useQuery<AnalyticsData, Error, AnalyticsData["resellerStores"]>({
    queryKey: ["analytics", timeRange],
    queryFn: () => fetchAnalyticsData(timeRange),
    select: (data) => data.resellerStores,
    retry: false,
    staleTime: 60000,
  });
}

/**
 * Hook for fetching only best reseller stores data
 */
export function useBestResellerStoresData(timeRange: TimeRange) {
  return useQuery<AnalyticsData, Error, AnalyticsData["bestResellerStores"]>({
    queryKey: ["analytics", timeRange],
    queryFn: () => fetchAnalyticsData(timeRange),
    select: (data) => data.bestResellerStores,
    retry: false,
    staleTime: 60000,
  });
}
