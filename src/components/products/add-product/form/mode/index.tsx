"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import SearchableSelect from "@/components/ui/select-with-search";
import { useProductForm } from "../../form-context";;

function ModeProductInformation() {
  const { form } = useProductForm();
  return (
    <Card className="p-5 border border-solid border-[#E0E2E7] rounded-lg flex flex-col gap-4">
      <h5 className="font-semibold">Mode</h5>
      <FormField
        control={form.control}
        name="mode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Mode</FormLabel>
            <FormControl>
              <SearchableSelect
                value={field.value}
                items={[
                  { value: "pre-order", label: "Pre order" },
                  { value: "on-sale", label: "On Sale" },
                  { value: "available", label: "Available" },
                ]}
                placeholder="-- Select Mode --"
                searchPlaceholder="find a mode"
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Card>
  );
}

export default ModeProductInformation;
