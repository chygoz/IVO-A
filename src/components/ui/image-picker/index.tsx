"use client";
import React, { useState, useEffect } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Upload,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createMedia } from "@/actions/media/create.media";
import LoadingSpinner from "../loading-spinner";
import { motion, AnimatePresence } from "framer-motion";
import { MediaResponse } from "@/actions/media/types";
import { getMyMedia } from "@/actions/media";

type SelectedImage = {
  image: string;
  type: string;
  mode: string;
  view: string;
};

type ImagePickerProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  selectedImages: Set<string>;
  setSelectedImages: React.Dispatch<React.SetStateAction<Set<string>>>;
  handleSetImages: React.Dispatch<React.SetStateAction<SelectedImage[]>>;
};

const ITEMS_PER_PAGE = 12;

const ImagePicker: React.FC<ImagePickerProps> = ({
  open,
  setOpen,
  selectedImages,
  setSelectedImages,
  handleSetImages,
}) => {
  // Fetch images using react-query
  const {
    data: mediaResponse,
    isLoading,
    isError,
    refetch,
  } = useQuery<MediaResponse>({
    queryKey: ["myMedia"],
    queryFn: getMyMedia,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const images = mediaResponse?.data?.media?.map((media) => media?.url) || [];

  const mutation = useMutation({
    mutationFn: createMedia,
    onSuccess() {
      refetch(); // Refetch images after successful upload
    },
  });

  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dragActive, setDragActive] = useState(false);

  // Reset to first page when images length changes
  useEffect(() => {
    if (images.length > 0) {
      setCurrentPage(1);
    }
    //eslint-disable-next-line
  }, [images.length === 0]);

  const totalPages = Math.max(1, Math.ceil(images.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentImages = images.slice(startIndex, endIndex);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      try {
        await mutation.mutateAsync(formData);
        // New image will appear after the refetch triggered in onSuccess
        event.target.value = ""; // Reset the input
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const formData = new FormData();
      formData.append("image", e.dataTransfer.files[0]);
      try {
        await mutation.mutateAsync(formData);
        // Will refetch in onSuccess
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
  };

  const toggleImageSelection = (imageUrl: string) => {
    const newSelection = new Set(selectedImages);
    if (newSelection.has(imageUrl)) {
      newSelection.delete(imageUrl);
    } else {
      newSelection.add(imageUrl);
    }
    setSelectedImages(newSelection);
  };

  // Animation variants for Framer Motion
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    exit: { scale: 0.8, opacity: 0 },
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        type="button"
        className="bg-[#F7F7F7] p-2 rounded-lg text-primary hover:bg-primary hover:text-white transition-colors"
      >
        Select Images
      </DialogTrigger>

      <DialogContent className="sm:max-w-[850px]">
        <DialogHeader>
          <DialogTitle>Media Picker</DialogTitle>
          <DialogDescription>
            Pick one or more images from your media or upload new ones
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {/* Styled File Input */}
          {mutation.isPending ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="flex justify-center py-6"
            >
              <LoadingSpinner />
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${dragActive
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-gray-400"
                }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple={false}
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                aria-label="Upload image"
              />
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Drag and drop your images here, or click to browse
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Supports: JPG, PNG, GIF (Max 10MB each)
                </p>
              </div>
            </motion.div>
          )}

          {/* Error State */}
          {isError && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-4"
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Failed to load your media. Please try again later.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && !isError && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-6 flex justify-center py-12"
            >
              <LoadingSpinner />
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && images.length === 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-6 text-center py-8 bg-gray-50 rounded-lg"
            >
              <p className="text-gray-500">
                You don&apos;t have any images yet. Upload one to get started.
              </p>
            </motion.div>
          )}

          {/* Image Grid */}
          {!isLoading && !isError && images.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-6"
            >
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                <AnimatePresence>
                  {currentImages.map((image, index) => (
                    <motion.div
                      key={`${image}-${index}`}
                      className="relative group"
                      variants={imageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      onMouseEnter={() => setIsHovering(image)}
                      onMouseLeave={() => setIsHovering(null)}
                    >
                      <div className="aspect-square relative rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          width={900}
                          height={900}
                          priority={index < 6}
                          fetchPriority={index < 6 ? "high" : "auto"}
                          alt={`Media ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity:
                              isHovering === image || selectedImages.has(image)
                                ? 1
                                : 0,
                          }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 bg-black/40"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleImageSelection(image)}
                        aria-label={
                          selectedImages.has(image)
                            ? "Deselect image"
                            : "Select image"
                        }
                        className={`absolute top-2 right-2 h-6 w-6 rounded-full flex items-center justify-center transition-colors ${selectedImages.has(image)
                          ? "bg-primary text-white"
                          : "bg-white text-gray-600"
                          }`}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Pagination */}
          {!isLoading && !isError && totalPages > 1 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-6 flex items-center justify-center gap-2"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {selectedImages.size} images selected
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            {selectedImages.size > 0 ? (
              <Button
                type="button"
                onClick={() => {
                  handleSetImages(
                    Array.from(selectedImages).map((value) => ({
                      image: value,
                      type: "half",
                      view: "front",
                      mode: "product",
                    }))
                  );
                  setOpen(false);
                }}
              >
                Add Selected{" "}
                {selectedImages.size > 0 && `(${selectedImages.size})`}
              </Button>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePicker;
