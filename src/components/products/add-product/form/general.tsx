"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useProductForm } from "../form-context";
function GeneralProductInformation() {
  const { form } = useProductForm();
  return (
    <Card className="p-5 border border-solid border-[#E0E2E7] rounded-lg flex flex-col gap-4">
      <h5 className="font-semibold">General Information</h5>
      <FormField
        control={form.control}
        name="productName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl>
              <Input placeholder="Type product name here. . ." {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Type product description here. . ."
                rows={5}
                style={{ resize: "none" }}
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
                placeholder="Type size & fit details here. . ."
                rows={5}
                style={{ resize: "none" }}
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </Card>
  );
}

export default GeneralProductInformation;
