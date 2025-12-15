"use client";
import React from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MoneyInput from "@/components/ui/money.input";
import { IVOSelect } from "@/components/ui/ivo-select";
import { sizes } from "@/data";
import QuantitySelector from "@/components/ui/quantity-selector";
import ProductColor from "../product.color";
import { useVariantProductForm } from "./wrapper";

function FormFields() {
  const { variantForm } = useVariantProductForm();
  return (
    <>
      <div className="flex items-center gap-8">
        <FormField
          control={variantForm.control}
          name="size"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Size</FormLabel>
              <FormControl>
                <IVOSelect
                  render={(data) => {
                    return (
                      <div className="flex items-center gap-3">
                        <div className="border border-solid border-[#F6F6F9] text-center p-0.5 w-8">
                          {data.value}
                        </div>
                        <p>{data.label}</p>
                      </div>
                    );
                  }}
                  className="w-full p-5"
                  value={field.value.value}
                  placeholder="- - Select a size - -"
                  onChange={(value) => {
                    field.onChange({ label: value, value });
                  }}
                  options={sizes}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={variantForm.control}
          name="color"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-1.5">
              <FormLabel>Color</FormLabel>
              <FormControl>
                <ProductColor {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex items-center gap-8">
        {/* <FormField
          control={variantForm.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <QuantitySelector
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={variantForm.control}
          name="price"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Price <span className="italic font-normal">(Optional)</span>
              </FormLabel>
              <FormControl>
                <MoneyInput
                  placeholder="Type variant price here..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}

export default FormFields;
