import { fetchProduct } from "./actions";
import ProductPreviewComponent from "@/components/products/product-preview-component";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Mock product data for prerendering
const mockProduct = {
  _id: "",
  name: "Loading...",
  code: "",
  published: false,
  status: "draft",
  mode: "available",
  slug: "",
  description: "",
  sizeFit: "",
  gender: "unisex",
  group: "adult",
  lookBuilders: [],
  details: [],
  category: {
    _id: "",
    name: "",
    slug: "",
  },
  basePrice: {
    currency: "USD",
    value: "0",
  },
  variants: [],
  tags: [],
  user: "",
  business: {
    _id: "",
    name: "",
    slug: "",
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default async function ProductPreviewServer({ slug }: { slug: string }) {
  const response = await fetchProduct(slug);

  // If we don't have data (prerendering), use mock data
  const productData =
    response.success && response.data ? response.data : mockProduct;

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
