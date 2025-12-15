"use client";
import ImagePicker from "@/components/ui/image-picker";
import React, { useState } from "react";
import ProductImageTable from "../product-table";
import { useVariantProductForm } from "../add-product-variant/wrapper";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type ProductImagesProps = {};

function ProductImages({}: ProductImagesProps) {
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const { variantForm } = useVariantProductForm();

  return (
    <FormField
      control={variantForm.control}
      name="images"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel hidden>Images</FormLabel>
          <FormControl>
            <div className="flex flex-col  gap-2 bg-transparent border border-solid border-[#E0E2E7] p-2">
              <ImagePicker
                handleSetImages={(value) => {
                  field.onChange(value);
                }}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
                open={open}
                setOpen={setOpen}
              />
              {field.value.length ? (
                <ProductImageTable
                  onChange={field.onChange}
                  setSelectedImages={setSelectedImages}
                  setSelect={selectedImages}
                  selectedImages={field.value}
                />
              ) : null}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default ProductImages;
