"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useVariantProductForm } from "./wrapper";
import { VariantFormData } from "./schema";
import { getSizeFormatted } from "@/data";

function AddVariationButton() {
  const { variantForm, value, onChange, closeModal } = useVariantProductForm();

  const onSubmit = (data: VariantFormData) => {
    const variants = value;

    onChange([
      ...variants,
      {
        color: {
          code: data.color.name.slice(0, 2),
          hex: data.color.hex,
          name: data.color.name,
        },
        size: getSizeFormatted(data.size.value),
        gallery: data.images.map((item) => ({
          url: item.image,
          mode: item.mode,
          view: item.view,
          type: item.type,
        })),
        quantity: data.quantity,
        ...(data.price ? { price: data.price } : {}),
      },
    ]);

    variantForm.reset();
    closeModal();
  };

  return (
    <Button
      onClick={() => variantForm.handleSubmit(onSubmit)()}
      type="button"
      className="w-full"
    >
      Add Variant
    </Button>
  );
}

export default AddVariationButton;
