"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useProductForm } from "../../form-context";;
import { VariantFormWrapper } from "./add-product-variant/wrapper";
import { Sheet } from "@/components/ui/sheet";

type VariantWrapperProps = {
  children: React.ReactNode;
};

function VariationWrapper({ children }: VariantWrapperProps) {
  const { form } = useProductForm();
  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name="variants"
      render={({ field }) => (
        <FormItem>
          <FormLabel hidden>Variant</FormLabel>
          <FormControl>
            <VariantFormWrapper
              closeModal={() => setOpen(false)}
              value={field.value}
              onChange={field.onChange}
            >
              <Sheet open={open} onOpenChange={setOpen}>
                {children}
              </Sheet>
            </VariantFormWrapper>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default VariationWrapper;
