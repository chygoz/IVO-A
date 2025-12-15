import { getProduct } from "@/actions/products/get.product";
import ProductEditForm from "@/components/products/product-edit-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ProductEditPage({
  params,
}: {
  params: { slug: string };
}) {
  const productResponse = await getProduct(params.slug);

  if (!productResponse.data) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-2">
          The product you&apos;re looking for doesn&apos;t exist or you
          don&apos;t have permission to view it.
        </p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>
    );
  }

  return <ProductEditForm product={productResponse.data} />;
}
