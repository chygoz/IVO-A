import { Suspense } from "react";
import { TimeFilterContextProvider } from "@/components/dashboard/time-filter-context";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import SummarySection from "@/components/dashboard/summary-section";
import SalesChartSection from "@/components/dashboard/sales-chart-section";
import CategoriesSection from "@/components/dashboard/categories-section";
import RecentOrdersSection from "@/components/dashboard/recent-order-section";
import LoadingDashboard from "@/components/dashboard/dashboard-loading";
import ErrorBoundaryWrapper from "@/components/error-boundary-wrapper";

export default function DashboardComponent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Extract timeRange from searchParams or use default
  const timeRange =
    typeof searchParams.timeRange === "string"
      ? (searchParams.timeRange as "all" | "12m" | "30d" | "7d" | "24h")
      : "all"; // Default to 'all'

  return (
    <TimeFilterContextProvider initialTimeRange={timeRange}>
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />

        <div className="grid grid-cols-1 gap-8">
          <ErrorBoundaryWrapper>
            <Suspense fallback={<LoadingDashboard section="summary" />}>
              <SummarySection />
            </Suspense>
          </ErrorBoundaryWrapper>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ErrorBoundaryWrapper>
                <Suspense fallback={<LoadingDashboard section="chart" />}>
                  <SalesChartSection />
                </Suspense>
              </ErrorBoundaryWrapper>
            </div>

            <div>
              <ErrorBoundaryWrapper>
                <Suspense fallback={<LoadingDashboard section="categories" />}>
                  <CategoriesSection />
                </Suspense>
              </ErrorBoundaryWrapper>
            </div>
          </div>
          <ErrorBoundaryWrapper>
            <Suspense fallback={<LoadingDashboard section="orders" />}>
              <RecentOrdersSection />
            </Suspense>
          </ErrorBoundaryWrapper>
        </div>
      </div>
    </TimeFilterContextProvider>
  );
}
