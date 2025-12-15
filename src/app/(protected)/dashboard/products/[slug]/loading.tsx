import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Loading() {
  return (
    <div className="container mx-auto py-6">
      {/* Header Section */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="mt-1 h-4 w-48" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main content - Gallery and info */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-lg border">
            <div className="bg-muted/40 p-6">
              <div className="flex space-x-4">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
                <div>
                  <Skeleton className="h-6 w-32 mb-4" />
                  <Skeleton className="h-20 w-full rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="space-y-6">
            <div className="rounded-lg border p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-8 w-32" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-3 w-20 mt-1" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-3 w-24 mt-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-2 mt-6">
                <Skeleton className="h-10 flex-1 rounded" />
                <Skeleton className="h-10 flex-1 rounded" />
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-4 w-48 mb-4" />
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-10 w-full rounded" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-10 w-full rounded" />
                </div>
                <div>
                  <Skeleton className="h-4 w-12 mb-2" />
                  <Skeleton className="h-10 w-full rounded" />
                </div>
              </div>
              <Skeleton className="h-8 w-full mt-4 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;