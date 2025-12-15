import React, { Suspense } from "react";
// import CollectionProductInformationForm from "./form";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { getMyCollections } from "@/actions/collections";
import CompleteLookForm from "./form";

async function ProductLookBuilder() {
  const collectionsResponse = await getMyCollections();
  const collections = collectionsResponse?.data?.results || [];
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CompleteLookForm />
    </Suspense>
  );
}

export default ProductLookBuilder;
