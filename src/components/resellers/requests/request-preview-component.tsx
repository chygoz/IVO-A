"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  IProduct,
  IVariant,
  IGallery,
} from "@/app/(protected)/dashboard/products/[slug]/types";
import { formatCurrency } from "@/lib/utils";
import { Submission } from "@/actions/submissions/utils";

interface RequestItemPreviewProps {
  product: IProduct;
}

const RequestItemPreview = ({ product }: RequestItemPreviewProps) => {
  const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<IGallery | null>(null);

  // Get unique colors and sizes from variants
  const uniqueColors = Array.from(
    new Map(
      product.variants
        .filter((v) => v.active && v.color)
        .map((v) => [v.color.code, v.color])
    ).values()
  );

  const uniqueSizes = Array.from(
    new Map(
      product.variants
        .filter((v) => v.active && v.size)
        .map((v) => [v.size.code, v.size])
    ).values()
  ).sort((a, b) => a.sortOrder - b.sortOrder);

  // Find available variants for the selected color/size
  const availableVariants = product.variants.filter(
    (v) =>
      v.active &&
      (!selectedColor || (v.color && v.color.code === selectedColor)) &&
      (!selectedSize || (v.size && v.size.code === selectedSize))
  );

  // Get available sizes for the selected color
  const availableSizesForColor = Array.from(
    new Map(
      product.variants
        .filter(
          (v) =>
            v.active &&
            (!selectedColor || (v.color && v.color.code === selectedColor))
        )
        .map((v) => (v.size ? [v.size.code, v.size] : [null, null]))
        .filter(
          (item): item is [string, any] => item[0] !== null && item[1] !== null
        )
    ).values()
  ).sort((a, b) => a.sortOrder - b.sortOrder);

  // Get available colors for the selected size
  const availableColorsForSize = Array.from(
    new Map(
      product.variants
        .filter(
          (v) =>
            v.active &&
            (!selectedSize || (v.size && v.size.code === selectedSize))
        )
        .map((v) => (v.color ? [v.color.code, v.color] : [null, null]))
        .filter(
          (item): item is [string, any] => item[0] !== null && item[1] !== null
        )
    ).values()
  );

  // Find all images from available variants
  const allImages = availableVariants.flatMap((v) => v.gallery);

  // Initialize selections when component mounts
  useEffect(() => {
    if (product.variants.length > 0) {
      // Find first active variant
      const firstActiveVariant = product.variants.find((v) => v.active);

      if (firstActiveVariant) {
        setSelectedVariant(firstActiveVariant);
        if (firstActiveVariant.color) {
          setSelectedColor(firstActiveVariant.color.code);
        }
        if (firstActiveVariant.size) {
          setSelectedSize(firstActiveVariant.size.code);
        }
        if (firstActiveVariant.gallery.length > 0) {
          setSelectedImage(firstActiveVariant.gallery[0]);
        }
      }
    }
  }, [product]);

  // Update selected variant when color or size changes
  useEffect(() => {
    if (selectedColor && selectedSize) {
      const variant = product.variants.find(
        (v) =>
          v.active &&
          v.color?.code === selectedColor &&
          v.size?.code === selectedSize
      );

      if (variant) {
        setSelectedVariant(variant);
        if (
          variant.gallery.length > 0 &&
          !variant.gallery.some((img) => img.url === selectedImage?.url)
        ) {
          setSelectedImage(variant.gallery[0]);
        }
      } else {
        setSelectedVariant(null);
      }
    } else if (selectedColor) {
      const variant = product.variants.find(
        (v) => v.active && v.color?.code === selectedColor
      );

      if (variant) {
        setSelectedVariant(variant);
        if (
          variant.gallery.length > 0 &&
          !variant.gallery.some((img) => img.url === selectedImage?.url)
        ) {
          setSelectedImage(variant.gallery[0]);
        }
      }
    } else if (selectedSize) {
      const variant = product.variants.find(
        (v) => v.active && v.size?.code === selectedSize
      );

      if (variant) {
        setSelectedVariant(variant);
        if (
          variant.gallery.length > 0 &&
          !variant.gallery.some((img) => img.url === selectedImage?.url)
        ) {
          setSelectedImage(variant.gallery[0]);
        }
      }
    }
  }, [selectedColor, selectedSize, product.variants, selectedImage]);

  // Select first image if none selected
  useEffect(() => {
    if (!selectedImage && allImages.length > 0) {
      setSelectedImage(allImages[0]);
    }
  }, [allImages, selectedImage]);

  // Handle quantity changes
  const increaseQuantity = () => {
    const maxAvailable = selectedVariant?.quantity || 0;
    setQuantity((prev) => Math.min(prev + 1, maxAvailable));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <div className="flex flex-col">
              <div className="aspect-square w-full overflow-hidden rounded-lg">
                {selectedImage ? (
                  <motion.div
                    key={selectedImage.url}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={selectedImage.url}
                      alt="Product Image"
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                ) : (
                  <div className="flex h-full items-center justify-center bg-gray-100">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
              </div>

              {/* Image thumbnails */}
              <div className="mt-4 grid grid-cols-5 gap-2">
                {allImages.slice(0, 5).map((image, idx) => (
                  <button
                    key={idx}
                    className={`relative aspect-square overflow-hidden rounded-md ${
                      selectedImage?.url === image.url
                        ? "ring-2 ring-primary"
                        : "ring-1 ring-gray-200"
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.url}
                      alt="Product Image"
                      fill
                      className="object-cover"
                    />
                  </button>
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
                    {selectedVariant?.price
                      ? formatCurrency(
                          parseInt(selectedVariant.price.value),
                          selectedVariant.price.currency as "USD" | "NGN"
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
                          <button
                            key={color.code}
                            type="button"
                            className={`relative h-10 w-10 rounded-full border ${
                              selectedColor === color.code
                                ? "ring-2 ring-primary ring-offset-2"
                                : ""
                            }`}
                            style={{ backgroundColor: color.hex }}
                            onClick={() => setSelectedColor(color.code)}
                            aria-label={color.name}
                          >
                            <span className="sr-only">{color.name}</span>
                          </button>
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
                            <button
                              key={size.code}
                              type="button"
                              className={`flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium ${
                                selectedSize === size.code
                                  ? "border-primary bg-primary/10 text-primary"
                                  : isAvailable
                                  ? "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                                  : "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400"
                              }`}
                              disabled={!isAvailable}
                              onClick={() => setSelectedSize(size.code)}
                            >
                              {size.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Add to cart */}
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                      disabled={
                        !selectedVariant ||
                        selectedVariant.status === "out-of-stock" ||
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
                  {selectedVariant && (
                    <div className="mt-4">
                      <Badge
                        variant={
                          selectedVariant.status === "in-stock"
                            ? "success"
                            : selectedVariant.status === "limited-stock"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {selectedVariant.status === "in-stock"
                          ? "In Stock"
                          : selectedVariant.status === "limited-stock"
                          ? "Limited Stock"
                          : "Out of Stock"}
                      </Badge>
                      {selectedVariant.status === "limited-stock" && (
                        <p className="mt-1 text-sm text-amber-600">
                          Only {selectedVariant.quantity} left in stock
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
                        {(product as any).shipping ? (
                          <span>
                            Weight: {(product as any).shipping.weight}{" "}
                            {(product as any).shipping.weightUnit}
                            {(product as any).shipping.dimension && (
                              <span>
                                , Dimensions:{" "}
                                {(product as any).shipping.dimension.length} ×{" "}
                                {(product as any).shipping.dimension.width} ×{" "}
                                {(product as any).shipping.dimension.height} cm
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
};

const RequestPreviewComponent = ({ request }: { request: Submission }) => {
  return (
    <div className="p-4">
      {request.items.map((product, index) => (
        <div
          key={index}
          className="mb-8 border-b last:border-b-0 last:pb-0 pb-8"
        >
          {/**@ts-expect-error */}
          <RequestItemPreview product={product} />
        </div>
      ))}
    </div>
  );
};

export default RequestPreviewComponent;
