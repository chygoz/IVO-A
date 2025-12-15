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
import MoneyInput from "@/components/ui/money.input";
import { useProductForm } from "../form-context";

function ProductPricing() {
  const { form } = useProductForm();
  return (
    <Card className="p-5 border border-solid border-[#E0E2E7] rounded-lg flex flex-col gap-4">
      <h5 className="font-semibold">Pricing</h5>
      <div className="flex items-center gap-4">
        <FormField
          control={form.control}
          name="basePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel hidden>Base Price</FormLabel>
              <FormControl>
                <MoneyInput placeholder="Type base price here" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel hidden>Base Price</FormLabel>
              <FormControl>
                <select
                  className="flex p-3 rounded-md border border-solid border-[#ccc]"
                  defaultValue="NGN"
                  {...field}
                >
                  <option value="NGN">NGN</option>
                  <option value="USD">USD</option>
                </select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <h5 className="font-semibold">Discount</h5>
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="discount.value"
            render={({ field }) => (
              <FormItem>
                <FormLabel hidden>Discount</FormLabel>
                <FormControl>
                  <Input placeholder="Enter discount. . ." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount.type"
            render={({ field }) => (
              <FormItem>
                <FormLabel hidden>Discount Type</FormLabel>
                <FormControl>
                  <select
                    className="flex p-3 rounded-md border border-solid border-[#ccc]"
                    defaultValue="percent"
                    {...field}
                  >
                    <option value="percent">Percentage (%)</option>
                    <option value="flat">Flat Fee</option>
                  </select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Card>
  );
}

export default ProductPricing;
