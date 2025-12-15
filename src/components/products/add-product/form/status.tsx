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
import { useProductForm } from "../form-context";

function StatusProductInformation() {
  const { form } = useProductForm();
  return (
    <Card className="p-5 border border-solid border-[#E0E2E7] rounded-lg flex flex-col gap-4">
      <h5 className="font-semibold">Status</h5>
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Status</FormLabel>
            <FormControl>
              <SearchableSelect
                value={field.value}
                items={[
                  { value: "draft", label: "Draft" },
                  { value: "published", label: "Published" },
                  { value: "archived", label: "Archived" },
                ]}
                placeholder="-- Select status --"
                searchPlaceholder="find a status"
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

export default StatusProductInformation;
