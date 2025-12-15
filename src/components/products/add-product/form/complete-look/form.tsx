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

function CompleteLookForm() {
  const { form } = useProductForm();
  return (
    <Card className="p-5 border border-solid border-[#E0E2E7] rounded-lg flex flex-col gap-4">
      <h5 className="font-semibold">Look Builder </h5>
      <FormField
        control={form.control}
        name="collection"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Look Builder (Optional)</FormLabel>
            <FormControl>
              <SearchableSelect
                value={field.value || ""}
                items={[]}
                placeholder="-- Select a product --"
                searchPlaceholder="find a product"
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

export default CompleteLookForm;
