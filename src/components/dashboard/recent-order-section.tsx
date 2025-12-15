// components/dashboard/recent-orders-section.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRecentOrdersData } from "@/components/hooks/use-dashboard-data";
import { useTimeFilter } from "./time-filter-context";
import OrdersTable from "./orders-table";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function RecentOrdersSection() {
  const { timeRange } = useTimeFilter();
  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useRecentOrdersData(timeRange);

  // Loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-24" />
                  ))}
                </div>
                <Skeleton className="h-8 w-40" />
              </div>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-5 w-32" />
                    <div className="flex items-center gap-2 flex-1">
                      <Skeleton className="h-10 w-10 rounded" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-24" />
                    <div className="space-y-1 w-40">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Order</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              <p className="mb-3">Failed to load recent orders data.</p>
              <Button size="sm" variant="outline" onClick={() => refetch()}>
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
      <CardHeader>
        <CardTitle>Recent Order</CardTitle>
      </CardHeader>
      <CardContent>{orders && <OrdersTable orders={orders} />}</CardContent>
    </Card>
  );
}
