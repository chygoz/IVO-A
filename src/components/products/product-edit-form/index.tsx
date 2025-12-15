"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Check,
  X,
  Info,
  ImageIcon,
  Truck,
  Tag,
  Box,
  Layers,
  Settings,
  Eye,
  Archive,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  IProduct,
  IVariant,
} from "@/app/(protected)/dashboard/products/[slug]/types";
// import { updateProduct } from "@/actions/products/update-product";
import VariantsEditor from "./variants-editor";
import GalleryEditor from "./gallery-editor";
import ShippingForm from "./shipping-form";
import SEOForm from "./seo-form";

// Form schema
const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  code: z.string().min(1, "Product code is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  sizeFit: z.string().optional(),
  mode: z.enum(["on-sale", "pre-order", "available"]),
  gender: z.enum(["men", "women", "unisex"]),
  group: z.enum(["adult", "kids"]),
  status: z.enum(["draft", "published", "archived"]),
  basePrice: z.object({
    currency: z.enum(["USD", "NGN"]),
    value: z.string().min(1, "Price is required"),
  }),
  meta: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
  details: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

// This component would be implemented separately
const TagEditor = ({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
}) => {
  // Placeholder implementation
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="capitalize">
            {tag}
            <button
              type="button"
              className="ml-1 rounded-full hover:bg-muted"
              onClick={() => {
                const newTags = [...tags];
                newTags.splice(index, 1);
                onChange(newTags);
              }}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Add a tag"
          className="w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const value = e.currentTarget.value.trim();
              if (value && !tags.includes(value)) {
                onChange([...tags, value]);
                e.currentTarget.value = "";
              }
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          onClick={(e) => {
            const input = e.currentTarget
              .previousElementSibling as HTMLInputElement;
            const value = input.value.trim();
            if (value && !tags.includes(value)) {
              onChange([...tags, value]);
              input.value = "";
            }
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

// This component would be implemented separately
const DetailsEditor = ({
  details,
  onChange,
}: {
  details: string[];
  onChange: (details: string[]) => void;
}) => {
  // Placeholder implementation
  return (
    <div className="space-y-4">
      {details.map((detail, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={detail}
            onChange={(e) => {
              const newDetails = [...details];
              newDetails[index] = e.target.value;
              onChange(newDetails);
            }}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              const newDetails = [...details];
              newDetails.splice(index, 1);
              onChange(newDetails);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          onChange([...details, ""]);
        }}
      >
        Add Detail
      </Button>
    </div>
  );
};

interface ProductEditFormProps {
  product: IProduct;
}

export default function ProductEditForm({ product }: ProductEditFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(
    searchParams.get("tab") || "basic"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [variants, setVariants] = useState<IVariant[]>(product.variants || []);

  // Initialize form with product data
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      code: product.code,
      slug: product.slug,
      description: product.description || "",
      sizeFit: product.sizeFit || "",
      mode: product.mode,
      gender: product.gender,
      group: product.group,
      status: product.status,
      basePrice: product.basePrice,
      meta: product.meta,
      details: product.details || [],
      tags: product.tags || [],
    },
  });

  useEffect(() => {
    // Update active tab based on URL parameter
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const onSubmit = useCallback(
    async (values: z.infer<typeof productSchema>) => {
      try {
        setIsSubmitting(true);

        // Combine form values with variants
        const updatedProduct = {
          ...values,
          variants,
          _id: product._id,
        };

        // const result = await updateProduct(updatedProduct);
        const result = { success: false };

        if (result.success) {
          toast({
            title: "Product updated",
            description: "Your product has been updated successfully.",
          });

          // Navigate back to the product detail page
          router.push(`/products/${product._id}`);
        } else {
          toast({
            title: "Update failed",
            description:
              //@ts-expect-error
              result?.error || "Something went wrong. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Failed to update product:", error);
        toast({
          title: "Update failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [variants, product, router]
  );

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);

    // Update URL without navigation
    const url = new URL(window.location.href);
    url.searchParams.set("tab", value);
    window.history.pushState({}, "", url);
  }, []);

  return (
    <div className="container mx-auto py-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Header Section */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="icon"
                asChild
                className="h-10 w-10 rounded-full"
              >
                <Link href={`/dashboard/products/${product._id}`}>
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Edit Product</h1>
                <p className="text-sm text-muted-foreground">
                  {product.code} · {product.slug}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" type="button" asChild>
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

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span className="ml-2">Saving...</span>
                  </div>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main content area */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader className="bg-muted/40 pb-0">
                    <Tabs
                      value={activeTab}
                      onValueChange={handleTabChange}
                      className="w-full"
                    >
                      <div className="flex items-center justify-between">
                        <TabsList>
                          <TabsTrigger value="basic">
                            <Info className="mr-2 h-4 w-4" />
                            Basic Info
                          </TabsTrigger>
                          <TabsTrigger value="details">
                            <Box className="mr-2 h-4 w-4" />
                            Details
                          </TabsTrigger>
                          <TabsTrigger value="variants">
                            <Layers className="mr-2 h-4 w-4" />
                            Variants
                          </TabsTrigger>
                          <TabsTrigger value="images">
                            <ImageIcon className="mr-2 h-4 w-4" />
                            Images
                          </TabsTrigger>
                          <TabsTrigger value="shipping">
                            <Truck className="mr-2 h-4 w-4" />
                            Shipping
                          </TabsTrigger>
                          <TabsTrigger value="seo">
                            <Settings className="mr-2 h-4 w-4" />
                            SEO
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <CardContent className="mt-6 px-0 pb-0">
                        <TabsContent
                          value="basic"
                          className="m-0 animate-in fade-in-50 space-y-6 px-6 pb-6"
                        >
                          <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Product Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Product name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="code"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Product Code</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="SKU/Product code"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                              control={form.control}
                              name="gender"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Gender</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="men">Men</SelectItem>
                                      <SelectItem value="women">
                                        Women
                                      </SelectItem>
                                      <SelectItem value="unisex">
                                        Unisex
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="group"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Group</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select group" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="adult">
                                        Adult
                                      </SelectItem>
                                      <SelectItem value="kids">Kids</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                              control={form.control}
                              name="mode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Mode</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select mode" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="available">
                                        Available
                                      </SelectItem>
                                      <SelectItem value="on-sale">
                                        On Sale
                                      </SelectItem>
                                      <SelectItem value="pre-order">
                                        Pre-Order
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Product description"
                                    className="min-h-32"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="sizeFit"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Size & Fit</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Size and fit information"
                                    className="min-h-24"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TabsContent>

                        <TabsContent
                          value="details"
                          className="m-0 animate-in fade-in-50 space-y-6 px-6 pb-6"
                        >
                          <FormField
                            control={form.control}
                            name="details"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Product Details</FormLabel>
                                <FormDescription>
                                  Enter key details about the product
                                </FormDescription>
                                <FormControl>
                                  <DetailsEditor
                                    details={field.value || []}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Separator />

                          <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormDescription>
                                  Add tags to help categorize and filter your
                                  products
                                </FormDescription>
                                <FormControl>
                                  <TagEditor
                                    tags={field.value || []}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TabsContent>

                        <TabsContent
                          value="variants"
                          className="m-0 animate-in fade-in-50 px-6 pb-6"
                        >
                          <VariantsEditor
                            variants={variants}
                            onChange={setVariants}
                            basePrice={form.watch("basePrice")}
                          />
                        </TabsContent>

                        <TabsContent
                          value="images"
                          className="m-0 animate-in fade-in-50 px-6 pb-6"
                        >
                          <GalleryEditor
                            variants={variants}
                            onChange={(updatedVariants) =>
                              setVariants(updatedVariants)
                            }
                          />
                        </TabsContent>

                        <TabsContent
                          value="shipping"
                          className="m-0 animate-in fade-in-50 px-6 pb-6"
                        >
                          <ShippingForm
                            shipping={{
                              weight: 0,
                              weightUnit: "kg",
                              dimension: {
                                length: 0,
                                width: 0,
                                height: 0,
                              },
                            }}
                            onUpdate={(shipping) => {
                              // Update shipping info logic would go here
                            }}
                          />
                        </TabsContent>

                        <TabsContent
                          value="seo"
                          className="m-0 animate-in fade-in-50 px-6 pb-6"
                        >
                          <SEOForm
                            control={form.control}
                            slugField="slug"
                            metaTitleField="meta.title"
                            metaDescriptionField="meta.description"
                          />
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
                {/* Status Card */}
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
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="draft">
                                  <div className="flex items-center">
                                    <Badge variant="secondary" className="mr-2">
                                      Draft
                                    </Badge>
                                    <span>Not visible to customers</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="published">
                                  <div className="flex items-center">
                                    <Badge variant="success" className="mr-2">
                                      Published
                                    </Badge>
                                    <span>Visible to customers</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="archived">
                                  <div className="flex items-center">
                                    <Badge
                                      variant="destructive"
                                      className="mr-2"
                                    >
                                      Archived
                                    </Badge>
                                    <span>Hidden from store</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="mt-4 space-y-4"></div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="basePrice.value"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Base Price</FormLabel>
                              <FormControl>
                                <Input placeholder="0.00" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="basePrice.currency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Currency</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="USD">USD ($)</SelectItem>
                                  <SelectItem value="NGN">NGN (₦)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between gap-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        type="button"
                        asChild
                      >
                        <Link
                          href={`/dashboard/products/${product._id}/preview`}
                          target="_blank"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Link>
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            className="w-full"
                            type="button"
                          >
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Archive this product?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove the product from your store.
                              Customers will no longer be able to see or
                              purchase this product. You can restore it later.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                form.setValue("status", "archived");
                                form.handleSubmit(onSubmit)();
                              }}
                            >
                              Archive
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                </motion.div>

                {/* Inventory Summary Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Inventory Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Total Variants:
                          </span>
                          <span className="font-medium">{variants.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Total Stock:
                          </span>
                          <span className="font-medium">
                            {variants.reduce(
                              (acc, variant) => acc + variant.quantity,
                              0
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Active Variants:
                          </span>
                          <span className="font-medium">
                            {variants.filter((v) => v.active).length}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Out of Stock:
                          </span>
                          <span className="font-medium">
                            {
                              variants.filter(
                                (v) => v.status === "out-of-stock"
                              ).length
                            }
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        type="button"
                        onClick={() => handleTabChange("variants")}
                      >
                        Manage Variants
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                {/* Save Actions Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Save Changes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Save your changes to update this product in your store.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            <span className="ml-2">Saving...</span>
                          </div>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
