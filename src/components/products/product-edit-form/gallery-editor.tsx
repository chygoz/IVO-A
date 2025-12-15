"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, Upload, X, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IVariant,
  IGallery,
} from "@/app/(protected)/dashboard/products/[slug]/types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GalleryEditorProps {
  variants: IVariant[];
  onChange: (variants: IVariant[]) => void;
}

interface ImageUploadState {
  variantSku: string;
  type: "full" | "half" | "close-up";
  view: "front" | "back" | "side" | "top" | "bottom";
  mode: "model" | "product";
  file: File | null;
  name: string;
  previewUrl: string;
}

export default function GalleryEditor({
  variants,
  onChange,
}: GalleryEditorProps) {
  const [activeVariantSku, setActiveVariantSku] = useState<string>(
    variants[0]?.sku || ""
  );
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadState, setUploadState] = useState<ImageUploadState>({
    variantSku: "",
    type: "full",
    view: "front",
    mode: "product",
    file: null,
    name: "",
    previewUrl: "",
  });
  const [editingImage, setEditingImage] = useState<IGallery | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const activeVariant =
    variants.find((v) => v.sku === activeVariantSku) || variants[0];

  // Get all images across all variants
  const allImages = variants.flatMap((v) =>
    v.gallery.map((img) => ({ ...img, variantSku: v.sku }))
  );

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setUploadState({
        ...uploadState,
        file,
        name: file.name.split(".")[0],
        previewUrl,
      });
    }
  };

  // Handle image upload
  const handleImageUpload = () => {
    // In a real implementation, you would upload the file to your server/storage
    // For demo purposes, we'll simulate a successful upload with a fake URL
    if (!uploadState.file) return;

    const newImage: IGallery = {
      type: uploadState.type,
      view: uploadState.view,
      mode: uploadState.mode,
      url: uploadState.previewUrl, // In production, this would be the URL from your storage service
    };

    // Add the image to the selected variant
    const updatedVariants = variants.map((variant) => {
      if (variant.sku === uploadState.variantSku) {
        return {
          ...variant,
          gallery: [...variant.gallery, newImage],
        };
      }
      return variant;
    });

    onChange(updatedVariants);
    setIsUploadDialogOpen(false);
    setUploadState({
      variantSku: "",
      type: "full",
      view: "front",
      mode: "product",
      file: null,
      name: "",
      previewUrl: "",
    });
  };

  // Handle image deletion
  const handleDeleteImage = (variantSku: string, imageUrl: string) => {
    const updatedVariants = variants.map((variant) => {
      if (variant.sku === variantSku) {
        return {
          ...variant,
          gallery: variant.gallery.filter((img) => img.url !== imageUrl),
        };
      }
      return variant;
    });

    onChange(updatedVariants);
  };

  // Handle editing image metadata
  const handleEditImage = (image: IGallery, variantSku: string) => {
    setEditingImage({ ...image });
    setIsEditDialogOpen(true);
  };

  // Save image edits
  const handleSaveImageEdits = () => {
    if (!editingImage) return;

    const { variantSku, ...imageData } = editingImage as IGallery & {
      variantSku: string;
    };

    const updatedVariants = variants.map((variant) => {
      if (variant.sku === variantSku) {
        return {
          ...variant,
          gallery: variant.gallery.map((img) =>
            img.url === imageData.url ? imageData : img
          ),
        };
      }
      return variant;
    });

    onChange(updatedVariants);
    setIsEditDialogOpen(false);
    setEditingImage(null);
  };

  // Initialize upload dialog with variant
  const openUploadDialog = (variantSku: string) => {
    setUploadState({
      ...uploadState,
      variantSku,
    });
    setIsUploadDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium">Product Images</h3>
          <p className="text-sm text-muted-foreground">
            Manage images for each variant of your product
          </p>
        </div>
        <Button
          onClick={() =>
            openUploadDialog(activeVariant?.sku || variants[0]?.sku)
          }
          disabled={variants.length === 0}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Image
        </Button>
      </div>

      {variants.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-muted p-3">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No variants available</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Create product variants first to add images.
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                /* Navigate to variants tab */
              }}
            >
              Manage Variants
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="byVariant" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="byVariant">By Variant</TabsTrigger>
            <TabsTrigger value="allImages">All Images</TabsTrigger>
          </TabsList>

          <TabsContent value="byVariant" className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {variants.map((variant) => (
                <Button
                  key={variant.sku}
                  variant={
                    activeVariantSku === variant.sku ? "default" : "outline"
                  }
                  onClick={() => setActiveVariantSku(variant.sku)}
                  className="flex items-center gap-2"
                >
                  {variant.color && (
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: variant.color.hex }}
                    />
                  )}
                  <span>
                    {variant.color?.name || ""}
                    {variant.color && variant.size ? " / " : ""}
                    {variant.size?.name || ""}
                  </span>
                  <Badge variant="secondary" className="ml-1">
                    {variant.gallery.length}
                  </Badge>
                </Button>
              ))}
            </div>

            {activeVariant && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium">
                    {activeVariant.color?.name} {activeVariant.size?.name}{" "}
                    Images
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openUploadDialog(activeVariant.sku)}
                  >
                    <Plus className="mr-2 h-3 w-3" />
                    Add Image
                  </Button>
                </div>

                {activeVariant.gallery.length === 0 ? (
                  <div className="flex h-40 w-full items-center justify-center rounded-lg border border-dashed">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <ImageIcon size={32} className="mb-2" />
                      <p>No images for this variant</p>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => openUploadDialog(activeVariant.sku)}
                      >
                        Upload an image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    <AnimatePresence>
                      {activeVariant.gallery.map((image, index) => (
                        <motion.div
                          key={`${activeVariant.sku}-${index}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="group relative aspect-square overflow-hidden rounded-md border"
                        >
                          <Image
                            src={image.url}
                            alt={`Product image - ${image.mode} view`}
                            fill
                            className="object-cover transition-all group-hover:opacity-80"
                          />
                          <div className="absolute inset-0 flex items-end p-2">
                            <div className="flex w-full items-center justify-between rounded-md bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100">
                              <div className="flex items-center space-x-1">
                                <Badge
                                  variant="outline"
                                  className="border-white/30 text-xs"
                                >
                                  {image.view}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="border-white/30 text-xs"
                                >
                                  {image.mode}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleEditImage(image, activeVariant.sku)
                                  }
                                  className="rounded-full p-1 hover:bg-white/20"
                                >
                                  <Edit className="h-3 w-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteImage(
                                      activeVariant.sku,
                                      image.url
                                    )
                                  }
                                  className="rounded-full p-1 hover:bg-white/20"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="allImages" className="space-y-4">
            {allImages.length === 0 ? (
              <div className="flex h-40 w-full items-center justify-center rounded-lg border border-dashed">
                <div className="flex flex-col items-center text-muted-foreground">
                  <ImageIcon size={32} className="mb-2" />
                  <p>No images uploaded yet</p>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => openUploadDialog(variants[0]?.sku)}
                  >
                    Upload your first image
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-base font-medium">All Product Images</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  <AnimatePresence>
                    {allImages.map((image, index) => {
                      const variant = variants.find(
                        (v) => v.sku === image.variantSku
                      );
                      return (
                        <motion.div
                          key={`all-${index}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="group relative aspect-square overflow-hidden rounded-md border"
                        >
                          <Image
                            src={image.url}
                            alt={`Product image - ${image.mode} view - ${image.variantSku}`}
                            fill
                            className="object-cover transition-all group-hover:opacity-80"
                          />
                          <div className="absolute inset-0 flex items-end p-2">
                            <div className="flex w-full flex-col rounded-md bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1">
                                  <Badge
                                    variant="outline"
                                    className="border-white/30 text-xs"
                                  >
                                    {image.view}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="border-white/30 text-xs"
                                  >
                                    {image.mode}
                                  </Badge>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleEditImage(image, image.variantSku)
                                    }
                                    className="rounded-full p-1 hover:bg-white/20"
                                  >
                                    <Edit className="h-3 w-3" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDeleteImage(
                                        image.variantSku,
                                        image.url
                                      )
                                    }
                                    className="rounded-full p-1 hover:bg-white/20"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                              <div className="mt-1 text-xs">
                                {variant?.color?.name} {variant?.size?.name}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      )}

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>
              Add a new image to your product variant
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {uploadState.previewUrl ? (
              <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-md border">
                <Image
                  src={uploadState.previewUrl}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                  onClick={() => {
                    setUploadState({
                      ...uploadState,
                      file: null,
                      previewUrl: "",
                    });
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex h-40 w-full items-center justify-center rounded-lg border border-dashed">
                <div className="flex flex-col items-center text-muted-foreground">
                  <Upload size={32} className="mb-2" />
                  <p>Drag & drop or click to upload</p>
                  <Input
                    type="file"
                    accept="image/*"
                    className="mt-2 w-full max-w-xs"
                    onChange={handleFileSelect}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="image-name">Image Name</Label>
              <Input
                id="image-name"
                value={uploadState.name}
                onChange={(e) =>
                  setUploadState({ ...uploadState, name: e.target.value })
                }
                disabled={!uploadState.file}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="variant">Variant</Label>
                <Select
                  value={uploadState.variantSku}
                  onValueChange={(value) =>
                    setUploadState({ ...uploadState, variantSku: value })
                  }
                >
                  <SelectTrigger id="variant">
                    <SelectValue placeholder="Select variant" />
                  </SelectTrigger>
                  <SelectContent>
                    {variants.map((variant) => (
                      <SelectItem key={variant.sku} value={variant.sku}>
                        {variant.color?.name || ""} {variant.size?.name || ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mode">Image Mode</Label>
                <Select
                  value={uploadState.mode}
                  onValueChange={(value) =>
                    setUploadState({
                      ...uploadState,
                      mode: value as "model" | "product",
                    })
                  }
                >
                  <SelectTrigger id="mode">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="model">Model</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Image Type</Label>
                <Select
                  value={uploadState.type}
                  onValueChange={(value) =>
                    setUploadState({
                      ...uploadState,
                      type: value as "full" | "half" | "close-up",
                    })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full</SelectItem>
                    <SelectItem value="half">Half</SelectItem>
                    <SelectItem value="close-up">Close-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="view">Image View</Label>
                <Select
                  value={uploadState.view}
                  onValueChange={(value) =>
                    setUploadState({
                      ...uploadState,
                      view: value as
                        | "front"
                        | "back"
                        | "side"
                        | "top"
                        | "bottom",
                    })
                  }
                >
                  <SelectTrigger id="view">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="front">Front</SelectItem>
                    <SelectItem value="back">Back</SelectItem>
                    <SelectItem value="side">Side</SelectItem>
                    <SelectItem value="top">Top</SelectItem>
                    <SelectItem value="bottom">Bottom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsUploadDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleImageUpload}
              disabled={!uploadState.file || !uploadState.variantSku}
            >
              Upload Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Image Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
            <DialogDescription>
              Modify image metadata and settings
            </DialogDescription>
          </DialogHeader>

          {editingImage && (
            <div className="space-y-4 py-4">
              <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-md border">
                <Image
                  src={editingImage.url}
                  alt={`Product image - ${editingImage.mode} view`}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-image-name">Image Filename</Label>
                <Input
                  id="edit-image-name"
                  value={editingImage.url.split("/").pop()?.split(".")[0] || ""}
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-mode">Image Mode</Label>
                  <Select
                    value={editingImage.mode}
                    onValueChange={(value) =>
                      setEditingImage({
                        ...editingImage,
                        mode: value as "model" | "product",
                      })
                    }
                  >
                    <SelectTrigger id="edit-mode">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="model">Model</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-type">Image Type</Label>
                  <Select
                    value={editingImage.type}
                    onValueChange={(value) =>
                      setEditingImage({
                        ...editingImage,
                        type: value as "full" | "half" | "close-up",
                      })
                    }
                  >
                    <SelectTrigger id="edit-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full</SelectItem>
                      <SelectItem value="half">Half</SelectItem>
                      <SelectItem value="close-up">Close-up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-view">Image View</Label>
                <Select
                  value={editingImage.view}
                  onValueChange={(value) =>
                    setEditingImage({
                      ...editingImage,
                      view: value as
                        | "front"
                        | "back"
                        | "side"
                        | "top"
                        | "bottom",
                    })
                  }
                >
                  <SelectTrigger id="edit-view">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="front">Front</SelectItem>
                    <SelectItem value="back">Back</SelectItem>
                    <SelectItem value="side">Side</SelectItem>
                    <SelectItem value="top">Top</SelectItem>
                    <SelectItem value="bottom">Bottom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveImageEdits}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
