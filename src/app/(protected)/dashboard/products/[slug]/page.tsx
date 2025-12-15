import { getProduct } from "@/actions/products/get.product";
import ProductDetailClient from "./client";

// Server component that fetches data
export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // Fetch product data on the server
  const response = await getProduct(params.slug);
  const product = response.data;

  return <ProductDetailClient product={product} />;
}
