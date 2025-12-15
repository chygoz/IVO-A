import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TableLoading: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <div className="border rounded-md">
        <div className="p-4 border-b">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-1 px-2">
                <Skeleton className="h-4 w-full max-w-[100px]" />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 space-y-6">
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="flex items-center">
              {[1, 2, 3, 4, 5].map((col) => (
                <div key={col} className="flex-1 px-2">
                  <Skeleton className="h-4 w-full max-w-[120px]" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableLoading;
