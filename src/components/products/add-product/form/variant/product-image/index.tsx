import React, { Suspense } from "react";
import ProductImages from "./form";
import { Skeleton } from "@/components/ui/skeleton";

async function ProductImageComponent() {
  return (
    <Suspense fallback={<Skeleton className="h-11 w-full" />}>
      <ProductImages />
    </Suspense>
  );
}

export default ProductImageComponent;
