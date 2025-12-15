import { getBlanks } from "@/actions/blanks/get.blanks";
import ProductsComponent from "@/components/products";
import LoadingSpinner from "@/components/ui/loading-spinner";
import React, { Suspense } from "react";

type ProductsPageProps = {
  searchParams: { page: string };
};

async function BlanksPage({ searchParams }: ProductsPageProps) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const productResponse = await getBlanks({
    page: page,
    limit: 12,
    sort: "newest",
  });
  const products = productResponse?.data?.results || [];
  const metadata = { ...productResponse?.data?.metadata, page };
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductsComponent products={products} metadata={metadata} type="blank" />
    </Suspense>
  );
}

export default BlanksPage;
