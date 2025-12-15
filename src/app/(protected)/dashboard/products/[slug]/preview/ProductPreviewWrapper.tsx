"use client";

import { useState, useEffect } from "react";
import ProductPreviewComponent from "@/components/products/product-preview-component";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { fetchProduct } from "./actions";

export default function ProductPreviewWrapper({ slug }: { slug: string }) {
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchProduct(slug);
        if (response.success && response.data) {
          setProductData(response.data);
        } else {
          setError(response.error || "Product not found");
        }
      } catch (err) {
        setError("Failed to load product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !productData) {
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

  return (
    <div>
      {/* Status and Edit Button - shown only in the preview page */}
      <div className="border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">Preview Mode</div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
              {productData.status}
            </div>

            <Button asChild size="sm" variant="outline">
              <Link href={`/dashboard/products/${slug}/edit`}>
                Edit Product
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Product Preview Component */}
      <ProductPreviewComponent product={productData} />
    </div>
  );
}