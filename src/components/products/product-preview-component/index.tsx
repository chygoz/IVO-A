// Remove "use client" directive to make this a server component
// We'll handle interactivity through props or separate client components if needed

import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  IProduct,
  IVariant,
  IGallery,
} from "@/app/(protected)/dashboard/products/[slug]/types";
import { formatCurrency } from "@/lib/utils";

interface ProductPreviewComponentProps {
  product: IProduct;
}

// Helper function to get unique colors
function getUniqueColors(variants: IVariant[]) {
  return Array.from(
    new Map(
      variants
        .filter((v) => v.active && v.color)
        .map((v) => [v.color!.code, v.color])
    ).values()
  );
}

// Helper function to get unique sizes
function getUniqueSizes(variants: IVariant[]) {
  return Array.from(
    new Map(
      variants
        .filter((v) => v.active && v.size)
        .map((v) => [v.size!.code, v.size])
    ).values()
  ).sort((a, b) => a.sortOrder - b.sortOrder);
}

// Helper function to get available variants
function getAvailableVariants(
  variants: IVariant[],
  selectedColor: string | null,
  selectedSize: string | null
) {
  return variants.filter(
    (v) =>
      v.active &&
      (!selectedColor || (v.color && v.color.code === selectedColor)) &&
      (!selectedSize || (v.size && v.size.code === selectedSize))
  );
}

// Helper function to get available sizes for a color
function getAvailableSizesForColor(
  variants: IVariant[],
  selectedColor: string | null
) {
  return Array.from(
    new Map(
      variants
        .filter(
          (v) =>
            v.active &&
            (!selectedColor || (v.color && v.color.code === selectedColor))
        )
        .map((v) => (v.size ? [v.size.code, v.size] : [null, null]))
        .filter(
          (item): item is [string, IVariant["size"]] =>
            item[0] !== null && item[1] !== null
        )
    ).values()
  ).sort((a, b) => a.sortOrder - b.sortOrder);
}

// Helper function to get available colors for a size
function getAvailableColorsForSize(
  variants: IVariant[],
  selectedSize: string | null
) {
  return Array.from(
    new Map(
      variants
        .filter(
          (v) =>
            v.active &&
            (!selectedSize || (v.size && v.size.code === selectedSize))
        )
        .map((v) => (v.color ? [v.color.code, v.color] : [null, null]))
        .filter(
          (item): item is [string, IVariant["color"]] =>
            item[0] !== null && item[1] !== null
        )
    ).values()
  );
}

// Get the first active variant for initial selection
function getFirstActiveVariant(variants: IVariant[]) {
  return variants.find((v) => v.active) || null;
}

// Get the first image from a variant
function getFirstImageFromVariant(variant: IVariant | null): IGallery | null {
  return variant && variant.gallery.length > 0 ? variant.gallery[0] : null;
}

export default function ProductPreviewComponent({
  product,
}: ProductPreviewComponentProps) {
  // Handle mock data case
  if (!product._id) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold">Loading product...</h2>
              <p className="mt-2 text-gray-500">
                Please wait while we load the product details.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get unique colors and sizes from variants
  const uniqueColors = getUniqueColors(product.variants);
  const uniqueSizes = getUniqueSizes(product.variants);

  // Get first active variant for initial selection
  const firstActiveVariant = getFirstActiveVariant(product.variants);
  const selectedColor = firstActiveVariant?.color?.code || null;
  const selectedSize = firstActiveVariant?.size?.code || null;

  // Get available variants for initial selection
  const availableVariants = getAvailableVariants(
    product.variants,
    selectedColor,
    selectedSize
  );

  // Get available sizes for the selected color
  const availableSizesForColor = getAvailableSizesForColor(
    product.variants,
    selectedColor
  );

  // Get available colors for the selected size
  const availableColorsForSize = getAvailableColorsForSize(
    product.variants,
    selectedSize
  );

  // Get the first image for display
  const selectedImage = getFirstImageFromVariant(firstActiveVariant);

  // Get all images from available variants
  const allImages = availableVariants.flatMap((v) => v.gallery);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <div className="flex flex-col">
              <div className="aspect-square w-full overflow-hidden rounded-lg">
                {selectedImage ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={selectedImage.url}
                      alt="Product image"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center bg-gray-100">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
              </div>

              {/* Image thumbnails */}
              <div className="mt-4 grid grid-cols-5 gap-2">
                {allImages.slice(0, 5).map((image, idx) => (
                  <div
                    key={idx}
                    className={`relative aspect-square overflow-hidden rounded-md ${
                      selectedImage?.url === image.url
                        ? "ring-2 ring-primary"
                        : "ring-1 ring-gray-200"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt="Product thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product info */}
            <div className="mt-10 lg:mt-0 lg:pl-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 capitalize">
                {product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <div className="flex items-center">
                  <p className="text-2xl font-medium text-gray-900">
                    {firstActiveVariant?.price
                      ? formatCurrency(
                          parseInt(firstActiveVariant.price.value),
                          firstActiveVariant.price.currency as "USD" | "NGN"
                        )
                      : formatCurrency(
                          parseInt(product.basePrice.value),
                          product.basePrice.currency as "USD" | "NGN"
                        )}
                  </p>

                  {product.mode === "pre-order" && (
                    <Badge variant="outline" className="ml-4">
                      Pre-order
                    </Badge>
                  )}
                </div>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <Star
                        key={rating}
                        className={`h-5 w-5 ${
                          rating < 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="ml-3 text-sm text-gray-500">42 reviews</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="space-y-6">
                  {/* Colors */}
                  {uniqueColors.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Color
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {availableColorsForSize.map((color: any) => (
                          <div
                            key={color.code}
                            className={`relative h-10 w-10 rounded-full border ${
                              selectedColor === color.code
                                ? "ring-2 ring-primary ring-offset-2"
                                : ""
                            }`}
                            style={{ backgroundColor: color.hex }}
                            aria-label={color.name}
                          >
                            <span className="sr-only">{color.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sizes */}
                  {uniqueSizes.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          Size
                        </h3>
                        <button
                          type="button"
                          className="text-sm font-medium text-primary hover:text-primary/90"
                        >
                          Size guide
                        </button>
                      </div>

                      <div className="mt-2 grid grid-cols-5 gap-2">
                        {availableSizesForColor.map((size: any) => {
                          const isAvailable = product.variants.some(
                            (v) =>
                              v.active &&
                              v.size?.code === size.code &&
                              (!selectedColor ||
                                v.color?.code === selectedColor) &&
                              v.status !== ("out-of-stock" as any)
                          );

                          return (
                            <div
                              key={size.code}
                              className={`flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium ${
                                selectedSize === size.code
                                  ? "border-primary bg-primary/10 text-primary"
                                  : isAvailable
                                  ? "border-gray-200 bg-white text-gray-900"
                                  : "border-gray-200 bg-gray-50 text-gray-400"
                              }`}
                            >
                              {size.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Add to cart */}
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                      disabled={
                        !firstActiveVariant ||
                        firstActiveVariant.status === "out-of-stock" ||
                        !selectedSize ||
                        !selectedColor
                      }
                      className="flex-1"
                      size="lg"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {product.mode === "pre-order"
                        ? "Pre-order Now"
                        : "Add to Cart"}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-md"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Product status */}
                  {firstActiveVariant && (
                    <div className="mt-4">
                      <Badge
                        variant={
                          firstActiveVariant.status === "in-stock"
                            ? "success"
                            : firstActiveVariant.status === "limited-stock"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {firstActiveVariant.status === "in-stock"
                          ? "In Stock"
                          : firstActiveVariant.status === "limited-stock"
                          ? "Limited Stock"
                          : "Out of Stock"}
                      </Badge>
                      {firstActiveVariant.status === "limited-stock" && (
                        <p className="mt-1 text-sm text-amber-600">
                          Only {firstActiveVariant.quantity} left in stock
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Product tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start border-b bg-transparent p-0">
                <TabsTrigger
                  value="description"
                  className="border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="sizing"
                  className="border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Size & Fit
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Shipping
                </TabsTrigger>
              </TabsList>
              <div className="mt-6 text-gray-700">
                <TabsContent
                  value="description"
                  className="prose prose-gray max-w-none"
                >
                  {product.description ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  ) : (
                    <p className="text-gray-500">No description available.</p>
                  )}
                </TabsContent>
                <TabsContent value="details">
                  {product.details && product.details.length > 0 ? (
                    <ul className="list-inside list-disc space-y-2">
                      {product.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No details available.</p>
                  )}
                </TabsContent>
                <TabsContent value="sizing">
                  {product.sizeFit ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: product.sizeFit }}
                    />
                  ) : (
                    <p className="text-gray-500">
                      No size information available.
                    </p>
                  )}
                </TabsContent>
                <TabsContent value="shipping">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-medium">
                        Shipping Details
                      </h3>
                      <p className="mt-1">
                        {/* @ts-ignore */}
                        {product.shipping ? (
                          <span>
                            {/* @ts-ignore */}
                            Weight: {product.shipping.weight} {/* @ts-ignore */}
                            {product.shipping.weightUnit}
                            {/* @ts-ignore */}
                            {product.shipping.dimension && (
                              <span>
                                , Dimensions: {/* @ts-ignore */}
                                {product.shipping.dimension.length} ×{" "}
                                {/* @ts-ignore */}
                                {product.shipping.dimension.width} ×{" "}
                                {/* @ts-ignore */}
                                {product.shipping.dimension.height} cm
                              </span>
                            )}
                          </span>
                        ) : (
                          "Shipping information not available."
                        )}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-base font-medium">Delivery</h3>
                      <p className="mt-1">
                        Standard delivery: 3-5 business days
                        <br />
                        Express delivery: 1-2 business days (additional charges
                        apply)
                      </p>
                    </div>
                    <div>
                      <h3 className="text-base font-medium">Returns</h3>
                      <p className="mt-1">
                        Free returns within 30 days of delivery.
                        <br />
                        Items must be unworn and in original packaging.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Related products section */}
          {product.lookBuilders && product.lookBuilders.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-bold">Complete the Look</h2>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                {/* This would display related products */}
                <div className="text-center text-gray-500">
                  Related products would appear here
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
