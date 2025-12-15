"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useSalesData,
  useSummaryCardsData,
} from "@/components/hooks/use-dashboard-data";
import { useTimeFilter } from "./time-filter-context";
import SalesChart from "./sales-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function SalesChartSection() {
  const { timeRange } = useTimeFilter();
  const {
    data: salesData,
    isLoading: isLoadingSales,
    error: salesError,
    refetch: refetchSales,
  } = useSalesData(timeRange);

  const { data: summaryData, isLoading: isLoadingSummary } =
    useSummaryCardsData(timeRange);

  const isLoading = isLoadingSales || isLoadingSummary;
  const error = salesError;

  // Loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[320px] w-full" />
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              <p className="mb-3">Failed to load sales chart data.</p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => refetchSales()}
              >
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Success state
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Total Sales</CardTitle>
        {summaryData && (
          <div className="text-2xl font-bold">
            {summaryData.totalSales.value}
          </div>
        )}
      </CardHeader>
      <CardContent>{salesData && <SalesChart data={salesData} />}</CardContent>
    </Card>
  );
}
