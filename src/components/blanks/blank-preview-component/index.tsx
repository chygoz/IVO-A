'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Minus, Plus, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BlanksData, Variant, Gallery } from '@/actions/blanks/types.d';
import { formatCurrency } from '@/lib/utils';
import { IBlank, IGallery, IVariant } from '@/actions/blanks/types';

interface BlankPreviewComponentProps {
  blank: IBlank;
}

export default function BlankPreviewComponent({
  blank,
}: BlankPreviewComponentProps) {
  const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<IGallery | null>(null);

  const uniqueColors = Array.from(
    new Map(
      blank.variants
        .filter((v) => v.active && v.color)
        .map((v) => [v.color.code, v.color])
    ).values()
  );

  const uniqueSizes = Array.from(
    new Map(
      blank.variants
        .filter((v) => v.active && v.size)
        .map((v) => [v.size.code, v.size])
    ).values()
  ).sort((a, b) => a.sortOrder - b.sortOrder);

  const availableVariants = blank.variants.filter(
    (v) =>
      v.active &&
      (!selectedColor || (v.color && v.color.code === selectedColor)) &&
      (!selectedSize || (v.size && v.size.code === selectedSize))
  );

  const availableSizesForColor = Array.from(
    new Map(
      //@ts-expect-error
      blank.variants
        .filter(
          (v) =>
            v.active &&
            (!selectedColor || (v.color && v.color.code === selectedColor))
        )
        .map((v) => (v.size ? [v.size.code, v.size] : []))
        .filter((item) => item.length === 2)
    ).values()
    //@ts-expect-error
  ).sort((a, b) => a.sortOrder - b.sortOrder);

  const availableColorsForSize = Array.from(
    new Map(
      //@ts-expect-error
      blank.variants
        .filter(
          (v) =>
            v.active &&
            (!selectedSize || (v.size && v.size.code === selectedSize))
        )
        .map((v) => (v.color ? [v.color.code, v.color] : []))
        .filter((item) => item.length === 2)
    ).values()
  );

  const allImages = availableVariants.flatMap((v) => v.gallery);

  useEffect(() => {
    if (blank.variants.length > 0) {
      const firstActiveVariant = blank.variants.find((v) => v.active);

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
  }, [blank]);

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const variant = blank.variants.find(
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
      const variant = blank.variants.find(
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
      const variant = blank.variants.find(
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
  }, [selectedColor, selectedSize, blank.variants, selectedImage]);

  useEffect(() => {
    if (!selectedImage && allImages.length > 0) {
      setSelectedImage(allImages[0]);
    }
  }, [allImages, selectedImage]);

  const increaseQuantity = () => {
    const maxAvailable = selectedVariant?.quantity || 0;
    setQuantity((prev) => Math.min(prev + 1, maxAvailable));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:max-w-none'>
          <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
            <div className='flex flex-col'>
              <div className='aspect-square w-full overflow-hidden rounded-lg'>
                {selectedImage ? (
                  <motion.div
                    key={selectedImage.url}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className='relative h-full w-full'
                  >
                    <Image
                      src={selectedImage.url}
                      alt={selectedImage.view || 'Product Image'}
                      fill
                      className='object-cover'
                      priority
                    />
                  </motion.div>
                ) : (
                  <div className='flex h-full items-center justify-center bg-gray-100'>
                    <p className='text-gray-500'>No image available</p>
                  </div>
                )}
              </div>

              <div className='mt-4 grid grid-cols-5 gap-2'>
                {allImages.slice(0, 5).map((image, idx) => (
                  <button
                    key={idx}
                    className={`relative aspect-square overflow-hidden rounded-md ${selectedImage?.url === image.url
                      ? 'ring-2 ring-primary'
                      : 'ring-1 ring-gray-200'
                      }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.url}
                      alt={image.view || `Product Image ${idx + 1}`}
                      fill
                      className='object-cover'
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className='mt-10 lg:mt-0 lg:pl-8'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900 capitalize'>
                {blank.name}
              </h1>

              <div className='mt-3'>
                <h2 className='sr-only'>Product information</h2>
                <div className='flex items-center'>
                  <p className='text-2xl font-medium text-gray-900'>
                    {formatCurrency(
                      parseInt(blank.basePrice.value),
                      blank.basePrice.currency
                    )}
                  </p>

                  {blank.mode === 'pre-order' && (
                    <Badge variant='outline' className='ml-4'>
                      Pre-order
                    </Badge>
                  )}
                </div>
              </div>

              <div className='mt-3'>
                <div className='flex items-center'>
                  <div className='flex items-center'>
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <Star
                        key={rating}
                        className={`h-5 w-5 ${rating < 4
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-200 text-gray-200'
                          }`}
                      />
                    ))}
                  </div>
                  <p className='ml-3 text-sm text-gray-500'>42 reviews</p>
                </div>
              </div>

              <div className='mt-6'>
                <div className='space-y-6'>
                  {uniqueColors.length > 0 && (
                    <div>
                      <h3 className='text-sm font-medium text-gray-900'>
                        Color
                      </h3>
                      <div className='mt-2 flex flex-wrap gap-2'>
                        {availableColorsForSize.map((color: any) => (
                          <button
                            key={color.code}
                            type='button'
                            className={`relative h-10 w-10 rounded-full border ${selectedColor === color.code
                              ? 'ring-2 ring-primary ring-offset-2'
                              : ''
                              }`}
                            style={{ backgroundColor: color.hex }}
                            onClick={() => setSelectedColor(color.code)}
                            aria-label={color.name}
                          >
                            <span className='sr-only'>{color.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {uniqueSizes.length > 0 && (
                    <div className='mt-4'>
                      <div className='flex items-center justify-between'>
                        <h3 className='text-sm font-medium text-gray-900'>
                          Size
                        </h3>
                        <button
                          type='button'
                          className='text-sm font-medium text-primary hover:text-primary/90'
                        >
                          Size guide
                        </button>
                      </div>

                      <div className='mt-2 grid grid-cols-5 gap-2'>
                        {availableSizesForColor.map((size: any) => {
                          const isAvailable = blank.variants.some(
                            (v) =>
                              v.active &&
                              v.size?.code === size.code &&
                              (!selectedColor ||
                                v.color?.code === selectedColor) &&
                              v.status !== 'out-of-stock'
                          );

                          return (
                            <button
                              key={size.code}
                              type='button'
                              className={`flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium ${selectedSize === size.code
                                ? 'border-primary bg-primary/10 text-primary'
                                : isAvailable
                                  ? 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
                                  : 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400'
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

                  {/* <div className='mt-4'>
                    <h3 className='text-sm font-medium text-gray-900'>
                      Quantity
                    </h3>
                    <div className='mt-2 flex items-center'>
                      <button
                        type='button'
                        className='rounded-l-md border border-r-0 border-gray-300 bg-white p-2 hover:bg-gray-50'
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                      >
                        <Minus className='h-4 w-4' />
                      </button>
                      <div className='w-16 border-y border-gray-300 px-3 py-2 text-center'>
                        {quantity}
                      </div>
                      <button
                        type='button'
                        className='rounded-r-md border border-l-0 border-gray-300 bg-white p-2 hover:bg-gray-50'
                        onClick={increaseQuantity}
                        disabled={
                          !selectedVariant ||
                          quantity >= selectedVariant.quantity ||
                          selectedVariant.status === 'out-of-stock'
                        }
                      >
                        <Plus className='h-4 w-4' />
                      </button>
                      <span className='ml-3 text-sm text-gray-500'>
                        {selectedVariant
                          ? `${selectedVariant.quantity} available`
                          : 'Select options'}
                      </span>
                    </div>
                  </div> */}

                  <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
                    <Button
                      disabled={
                        !selectedVariant ||
                        selectedVariant.status === 'out-of-stock' ||
                        !selectedSize ||
                        !selectedColor
                      }
                      className='flex-1'
                      size='lg'
                    >
                      <ShoppingCart className='mr-2 h-5 w-5' />
                      {blank.mode === 'pre-order'
                        ? 'Pre-order Now'
                        : 'Add to Cart'}
                    </Button>
                    <Button
                      variant='outline'
                      size='icon'
                      className='h-12 w-12 rounded-md'
                    >
                      <Heart className='h-5 w-5' />
                    </Button>
                  </div>

                  {selectedVariant && (
                    <div className='mt-4'>
                      <Badge
                        variant={
                          selectedVariant.status === 'in-stock'
                            ? 'success'
                            : selectedVariant.status === 'low-stock'
                              ? 'warning'
                              : 'destructive'
                        }
                      >
                        {selectedVariant.status === 'in-stock'
                          ? 'In Stock'
                          : selectedVariant.status === 'low-stock'
                            ? 'Limited Stock'
                            : 'Out of Stock'}
                      </Badge>
                      {selectedVariant.status === 'low-stock' && (
                        <p className='mt-1 text-sm text-amber-600'>
                          Only {selectedVariant.quantity} left in stock
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='mt-16'>
            <Tabs defaultValue='description' className='w-full'>
              <TabsList className='w-full justify-start border-b bg-transparent p-0'>
                <TabsTrigger
                  value='description'
                  className='border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent'
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value='details'
                  className='border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent'
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value='sizing'
                  className='border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent'
                >
                  Size & Fit
                </TabsTrigger>
                <TabsTrigger
                  value='shipping'
                  className='border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent'
                >
                  Shipping
                </TabsTrigger>
              </TabsList>
              <div className='mt-6 text-gray-700'>
                <TabsContent
                  value='description'
                  className='prose prose-gray max-w-none'
                >
                  {blank.description ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: blank.description }}
                    />
                  ) : (
                    <p className='text-gray-500'>No description available.</p>
                  )}
                </TabsContent>
                <TabsContent value='details'>
                  {blank.details && blank.details.length > 0 ? (
                    <ul className='list-inside list-disc space-y-2'>
                      {blank.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className='text-gray-500'>No details available.</p>
                  )}
                </TabsContent>
                <TabsContent value='sizing'>
                  {blank.sizeFit ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: blank.sizeFit }}
                    />
                  ) : (
                    <p className='text-gray-500'>
                      No size information available.
                    </p>
                  )}
                </TabsContent>
                <TabsContent value='shipping'>
                  <div className='space-y-4'>
                    <div>
                      <h3 className='text-base font-medium'>
                        Shipping Details
                      </h3>
                      <p className='mt-1'>
                        {blank.shipping ? (
                          <span>
                            Weight: {blank.shipping.weight}{' '}
                            {blank.shipping.weightUnit}
                            {blank.shipping.dimension && (
                              <span>
                                , Dimensions:{' '}
                                {blank.shipping.dimension.length} ×{' '}
                                {blank.shipping.dimension.width} ×{' '}
                                {blank.shipping.dimension.height} cm
                              </span>
                            )}
                          </span>
                        ) : (
                          'Shipping information not available.'
                        )}
                      </p>
                    </div>
                    <div>
                      <h3 className='text-base font-medium'>Delivery</h3>
                      <p className='mt-1'>
                        Standard delivery: 3-5 business days
                        <br />
                        Express delivery: 1-2 business days (additional charges
                        apply)
                      </p>
                    </div>
                    <div>
                      <h3 className='text-base font-medium'>Returns</h3>
                      <p className='mt-1'>
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

          {blank.lookBuilders && blank.lookBuilders.length > 0 && (
            <div className='mt-16'>
              <h2 className='text-xl font-bold'>Complete the Look</h2>
              <div className='mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4'>
                <div className='text-center text-gray-500'>
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
