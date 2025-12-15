"use client";

import SummaryCard from "./summary-card";
import { useSummaryCardsData } from "@/components/hooks/use-dashboard-data";
import { useTimeFilter } from "./time-filter-context";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function SummaryCards() {
  const { timeRange } = useTimeFilter();
  const { data, isLoading, error, refetch } = useSummaryCardsData(timeRange);

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p className="mb-3">Failed to load summary data.</p>
          <Button size="sm" variant="outline" onClick={() => refetch()}>
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Success state
  if (!data) return null;

  const cards = [
    data.totalSales,
    data.totalOrders,
    data.totalCustomers,
    data.totalResellers,
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <SummaryCard key={card.title} data={card} index={index} />
      ))}
    </div>
  );
}
