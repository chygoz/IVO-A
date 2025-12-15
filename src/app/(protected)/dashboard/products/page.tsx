import { getProducts } from "@/actions/products/get.products";
import { auth } from "@/auth";
import ProductsComponent from "@/components/products";
import LoadingSpinner from "@/components/ui/loading-spinner";
import React, { Suspense } from "react";

type ProductsPageProps = {
  searchParams: { page: string };
};

async function ProductsPage({ searchParams }: ProductsPageProps) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const session = await auth();
  const productResponse = await getProducts(
    session?.current_business?.identifier || "",
    page
  );
  const products = productResponse?.data?.results || [];
  const metadata = { ...productResponse?.data.metadata, page };
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductsComponent
        products={products}
        metadata={metadata}
        type="product"
      />
    </Suspense>
  );
}

export default ProductsPage;
