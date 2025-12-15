"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Edit,
  Archive,
  Eye,
  Tag,
  Box,
  Truck,
  Palette,
  Ruler,
  Layers,
  Info,
  ImageIcon,
  ListChecks,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

// Import the correct types
import { IProduct, IVariant, IGallery } from "./types";
import { formatCurrency } from "@/lib/utils";

type TabSectionProps = {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
};

const TabSection = ({ children, icon, title }: TabSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="pl-7">{children}</div>
    </div>
  );
};

const GalleryViewer = ({ images }: { images: IGallery[] }) => {
  const [selectedImage, setSelectedImage] = useState<IGallery | null>(
    images.length > 0 ? images[0] : null
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (images.length === 0) {
    return (
      <div className="flex h-96 w-full items-center justify-center rounded-lg border border-dashed">
        <div className="flex flex-col items-center text-muted-foreground">
          <ImageIcon size={48} className="mb-2" />
          <p>No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
      <div className="order-2 flex space-x-2 overflow-x-auto lg:order-1 lg:flex-col lg:space-x-0 lg:space-y-2">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex lg:flex-col"
        >
          {images.map((image, index) => (
            <motion.div
              key={image._id || index.toString()}
              variants={itemVariants}
              className="relative"
            >
              <div
                onClick={() => setSelectedImage(image)}
                className={`relative h-20 w-20 cursor-pointer overflow-hidden rounded-md border-2 transition hover:opacity-90 ${
                  selectedImage?.url === image.url
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image.url}
                  alt={`${image.view} view`}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-1 text-center text-xs text-white">
                  {image.view}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="order-1 lg:order-2 lg:col-span-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage?.url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-square w-full overflow-hidden rounded-lg"
          >
            {selectedImage && (
              <>
                <Image
                  src={selectedImage.url}
                  alt={`${selectedImage.view} view`}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 right-4 rounded-md bg-black/70 px-2 py-1 text-sm text-white">
                  <Badge variant="outline" className="border-white/30">
                    {selectedImage.mode}
                  </Badge>
                  <Badge variant="outline" className="ml-2 border-white/30">
                    {selectedImage.type}
                  </Badge>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const ProductVariantsTable = ({ variants }: { variants: IVariant[] }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Color</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Images</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variants.map((variant) => (
            <TableRow key={variant._id}>
              <TableCell className="font-mono text-xs">{variant.sku}</TableCell>
              <TableCell>
                {variant.size?.displayName || variant.size?.name || "—"}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {variant.color && (
                    <div
                      className="h-4 w-4 rounded-full border"
                      style={{ backgroundColor: variant.color.hex }}
                    />
                  )}
                  {variant.color?.name || "—"}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex flex-col">
                  <span>{variant.quantity}</span>
                  {variant.pendingQuantity ? (
                    <span className="text-xs text-muted-foreground">
                      {variant.pendingQuantity} pending
                    </span>
                  ) : null}
                </div>
              </TableCell>
              <TableCell className="text-right">
                {variant.price
                  ? formatCurrency(
                      parseFloat(variant.price.value),
                      variant.price.currency as "NGN" | "USD"
                    )
                  : "—"}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    variant.status === "in-stock"
                      ? "success"
                      : variant.status === "limited-stock"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {variant.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {variant.gallery.length}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const ProductDetailClient = ({ product }: { product: IProduct | null }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  if (!product) {
    return (
      <div className="container mx-auto py-10">
        <div className="rounded-md border border-destructive bg-destructive/10 p-4">
          <div className="flex">
            <Info className="h-5 w-5 text-destructive" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-destructive">Error</h3>
              <div className="mt-2 text-sm text-destructive">
                <p>The product could not be loaded. Please try again later.</p>
              </div>
            </div>
          </div>
        </div>

        <Button asChild className="mt-4">
          <Link href="/dashboard/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>
    );
  }

  // Combine all galleries from all variants
  const allImages = product
    ? product.variants.flatMap((variant) => variant.gallery || [])
    : [];

  const productStatus = {
    draft: { label: "Draft", variant: "secondary" as const },
    published: { label: "Published", variant: "success" as const },
    archived: { label: "Archived", variant: "destructive" as const },
  };

  const totalStock = product.variants.reduce(
    (acc, variant) => acc + (variant.quantity || 0),
    0
  );

  return (
    <div className="container mx-auto py-6">
      {/* Header Section */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            asChild
            className="h-10 w-10 rounded-full"
          >
            <Link href="/dashboard/products">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold capitalize">{product.name}</h1>
            <p className="text-sm text-muted-foreground">
              {product.code} · {product.slug}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={productStatus[product.status]?.variant}>
            {productStatus[product.status]?.label}
          </Badge>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <Link
                    href={`/dashboard/products/${product._id}/preview`}
                    target="_blank"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Preview product</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/dashboard/products/${product._id}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit product</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="destructive" size="icon">
            <Archive className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main content - Gallery and info */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/40 pb-0">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <div className="flex items-center justify-between">
                    <TabsList>
                      <TabsTrigger value="overview">
                        <Info className="mr-2 h-4 w-4" />
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="images">
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Images ({allImages.length})
                      </TabsTrigger>
                      <TabsTrigger value="variants">
                        <Layers className="mr-2 h-4 w-4" />
                        Variants ({product.variants.length})
                      </TabsTrigger>
                      <TabsTrigger value="analytics">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Analytics
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <CardContent className="mt-6 px-0 pb-0">
                    <TabsContent
                      value="overview"
                      className="m-0 animate-in fade-in-50 px-6 pb-6"
                    >
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div>
                          {/* Basic Info */}
                          <TabSection
                            icon={<Info className="h-5 w-5 text-primary" />}
                            title="Basic Info"
                          >
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-sm text-muted-foreground">
                                  Gender
                                </div>
                                <div className="font-medium capitalize">
                                  {product.gender}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-sm text-muted-foreground">
                                  Group
                                </div>
                                <div className="font-medium capitalize">
                                  {product.group}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-sm text-muted-foreground">
                                  Mode
                                </div>
                                <div className="font-medium capitalize">
                                  {product.mode}
                                </div>
                              </div>
                            </div>
                          </TabSection>

                          <div className="my-6">
                            <Separator />
                          </div>

                          {/* Shipping */}
                          <TabSection
                            icon={<Truck className="h-5 w-5 text-primary" />}
                            title="Shipping"
                          >
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-sm text-muted-foreground">
                                  Weight
                                </div>
                                <div className="font-medium">
                                  {/* Shipping information not available in current API */}
                                  Not specified
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-sm text-muted-foreground">
                                  Dimensions
                                </div>
                                <div className="font-medium">
                                  {/* Shipping information not available in current API */}
                                  Not specified
                                </div>
                              </div>
                            </div>
                          </TabSection>
                        </div>

                        <div>
                          {/* Product Details */}
                          <TabSection
                            icon={
                              <ListChecks className="h-5 w-5 text-primary" />
                            }
                            title="Details"
                          >
                            {product.details && product.details.length > 0 ? (
                              <ul className="ml-5 list-disc space-y-1">
                                {(product.details as any[]).map(
                                  (detail: any, index: number) => (
                                    <li key={index}>{detail}</li>
                                  )
                                )}
                              </ul>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                No details provided
                              </p>
                            )}
                          </TabSection>

                          <div className="my-6">
                            <Separator />
                          </div>

                          {/* Tags */}
                          <TabSection
                            icon={<Tag className="h-5 w-5 text-primary" />}
                            title="Tags"
                          >
                            <div className="flex flex-wrap gap-2">
                              {(product.tags as any[]) &&
                              product.tags.length > 0 ? (
                                (product.tags as any[]).map(
                                  (tag: any, index: number) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="capitalize"
                                    >
                                      {tag}
                                    </Badge>
                                  )
                                )
                              ) : (
                                <p className="text-sm text-muted-foreground">
                                  No tags added
                                </p>
                              )}
                            </div>
                          </TabSection>
                        </div>
                      </div>

                      {/* Description */}
                      {product.description && (
                        <div className="mt-8">
                          <TabSection
                            icon={<Info className="h-5 w-5 text-primary" />}
                            title="Description"
                          >
                            <div className="rounded-md bg-muted/50 p-4">
                              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                                {product.description}
                              </p>
                            </div>
                          </TabSection>
                        </div>
                      )}

                      {/* Size & Fit */}
                      {product.sizeFit && (
                        <div className="mt-8">
                          <TabSection
                            icon={<Ruler className="h-5 w-5 text-primary" />}
                            title="Size & Fit"
                          >
                            <div className="rounded-md bg-muted/50 p-4">
                              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                                {product.sizeFit}
                              </p>
                            </div>
                          </TabSection>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent
                      value="images"
                      className="m-0 animate-in fade-in-50 px-6 pb-6"
                    >
                      <GalleryViewer images={allImages} />
                    </TabsContent>

                    <TabsContent
                      value="variants"
                      className="m-0 animate-in fade-in-50 px-6 pb-6"
                    >
                      <ProductVariantsTable variants={product.variants} />
                    </TabsContent>

                    <TabsContent
                      value="analytics"
                      className="m-0 animate-in fade-in-50 px-6 pb-6"
                    >
                      <div className="flex h-96 w-full items-center justify-center rounded-lg border border-dashed">
                        <div className="flex flex-col items-center text-muted-foreground">
                          <BarChart3 size={48} className="mb-2" />
                          <p>Analytics data not available</p>
                          <p className="text-sm">
                            Connect to analytics to view performance data
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </CardContent>
                </Tabs>
              </CardHeader>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="space-y-6">
            {/* Product Status Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Product Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Base Price</p>
                      <p className="text-2xl font-bold">
                        {product.basePrice
                          ? formatCurrency(
                              parseFloat(product.basePrice.value),
                              product.basePrice.currency as "NGN" | "USD"
                            )
                          : "—"}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Inventory
                        </p>
                        <p className="text-xl font-semibold">{"-"}</p>
                        <p className="text-xs text-muted-foreground">
                          items in stock
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Variants
                        </p>
                        <p className="text-xl font-semibold">
                          {product.variants.length}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          different options
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Status</span>
                        <Badge variant={productStatus[product.status]?.variant}>
                          {productStatus[product.status]?.label}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Mode</span>
                        <Badge variant="outline" className="capitalize">
                          {product.mode}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link
                      href={`/dashboard/products/${product._id}/preview`}
                      target="_blank"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href={`/dashboard/products/${product._id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* SEO Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">SEO</CardTitle>
                  <CardDescription>
                    Search engine optimization data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="mb-1 text-sm font-medium">Meta Title</p>
                    <p className="rounded-md bg-muted/50 p-2 text-sm">
                      {product.meta?.title || product.name || "Not set"}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-sm font-medium">Meta Description</p>
                    <p className="rounded-md bg-muted/50 p-2 text-sm">
                      {product.meta?.description || "Not set"}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-sm font-medium">Slug</p>
                    <p className="rounded-md bg-muted/50 p-2 font-mono text-sm">
                      {product._id}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <Link
                      href={`/dashboard/products/${product._id}/edit?tab=seo`}
                    >
                      Edit SEO
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Colors & Sizes Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Colors & Sizes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Colors Section */}
                  <div>
                    <p className="mb-2 text-sm font-medium">Available Colors</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(
                        new Set(
                          product.variants
                            .filter((v: any) => v.color)
                            .map((v: any) => v.color.hex)
                        )
                      ).length > 0 ? (
                        Array.from(
                          new Map(
                            product.variants
                              .filter((v: any) => v.color)
                              .map((v: any) => [v.color.hex, v.color])
                          ).values()
                        ).map((color: any, index: number) => (
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className="h-8 w-8 rounded-full border shadow-sm"
                                  style={{ backgroundColor: color.hex }}
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{color.name}</p>
                                <p className="text-xs">{color.hex}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No colors available
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Sizes Section */}
                  <div>
                    <p className="mb-2 text-sm font-medium">Available Sizes</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(
                        new Set(
                          product.variants
                            .filter((v: any) => v.size)
                            .map((v: any) => v.size.code)
                        )
                      ).length > 0 ? (
                        Array.from(
                          new Map(
                            product.variants
                              .filter((v: any) => v.size)
                              .map((v: any) => [v.size.code, v.size])
                          ).values()
                        )
                          .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
                          .map((size: any, index: number) => (
                            <Badge key={index} variant="outline">
                              {size.displayName || size.name}
                            </Badge>
                          ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No sizes available
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Related Products Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Look Builders</CardTitle>
                  <CardDescription>
                    Products that can be paired with this item
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {(product.lookBuilders as any[]) &&
                  product.lookBuilders.length > 0 ? (
                    <div className="space-y-2">
                      {/* This would show related products, but for demo we'll show a placeholder */}
                      <p className="text-sm text-muted-foreground">
                        {product.lookBuilders.length} related products
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-4 text-center">
                      <Box className="mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="text-sm font-medium">No look builders</p>
                      <p className="text-xs text-muted-foreground">
                        Add products that pair well with this item
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <Link
                      href={`/dashboard/products/${product._id}/edit?tab=lookbuilders`}
                    >
                      Manage Look Builders
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailClient;
