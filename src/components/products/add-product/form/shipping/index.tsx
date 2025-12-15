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
import { Input } from "@/components/ui/input";
import { useProductForm } from "../../form-context";;
import { motion } from "framer-motion";
import { Grid2X2, Package } from "lucide-react";
import { z } from "zod";

interface ShippingConfigFormProps { }

// Define schema types
export type ProductFormData = z.infer<typeof productSchema>;
export const productSchema = z.object({
  shipping: z.object({
    weight: z.number(),
    length: z.number(),
    height: z.number(),
    width: z.number(),
  }),
  // Adding minimal other required fields to avoid TypeScript errors
  productName: z.string(),
  description: z.string(),
  category: z.string(),
  currency: z.string(),
  discount: z.object({
    type: z.string(),
    value: z.string(),
  }),
  status: z.enum(["draft", "archived", "published"]),
  mode: z.enum(["pre-order", "on-sale", "available"]),
  gender: z.enum(["men", "women", "unisex"]),
  sizeFit: z.string(),
  basePrice: z.string(),
  variants: z.array(
    z.object({
      color: z.object({
        name: z.string(),
        hex: z.string(),
        code: z.string(),
      }),
      quantity: z.number(),
      size: z.object({
        name: z.string(),
        code: z.string(),
        displayName: z.string(),
        sortOrder: z.number(),
      }),
      gallery: z.array(
        z.object({
          type: z.string(),
          view: z.string(),
          mode: z.string(),
          url: z.string(),
        })
      ),
    })
  ),
});

const ShippingConfigForm: React.FC<ShippingConfigFormProps> = () => {
  const { form } = useProductForm();

  // Define weight units - could be expanded or fetched from API if needed
  const weightUnits = [
    { value: "kg", label: "Kilograms (kg)" },
    { value: "g", label: "Grams (g)" },
    { value: "lb", label: "Pounds (lb)" },
    { value: "oz", label: "Ounces (oz)" },
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  // Helper function to format numeric input
  const formatNumericInput = (value: string): string => {
    // Allow empty string
    if (value === "") return "";

    // Remove non-numeric characters except decimal point
    const sanitized = value.replace(/[^\d.]/g, "");

    // Ensure only one decimal point
    const parts = sanitized.split(".");
    if (parts.length > 2) {
      return parts[0] + "." + parts.slice(1).join("");
    }

    return sanitized;
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <Card className="p-5 border border-solid border-[#E0E2E7] rounded-lg flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-gray-500" />
          <h5 className="font-semibold">Shipping Dimensions</h5>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-4">
            Please enter the shipping dimensions of your product. These details
            are used to calculate shipping costs.
          </p>

          {/* Weight */}
          <FormField
            control={form.control}
            name="shipping.weight"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="mb-4">
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter weight"
                      value={value?.toString() || ""}
                      onChange={(e) => {
                        const formatted = formatNumericInput(e.target.value);
                        onChange(formatted === "" ? 0 : parseFloat(formatted));
                      }}
                      className="pl-3 pr-10"
                      type="text"
                      inputMode="decimal"
                      {...fieldProps}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
                      kg
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dimensions section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Grid2X2 className="h-4 w-4 text-gray-500" />
              <h6 className="font-medium text-sm">Dimensions</h6>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Length */}
              <FormField
                control={form.control}
                name="shipping.length"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Length</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Length"
                          value={value?.toString() || ""}
                          onChange={(e) => {
                            const formatted = formatNumericInput(
                              e.target.value
                            );
                            onChange(
                              formatted === "" ? 0 : parseFloat(formatted)
                            );
                          }}
                          className="pl-3 pr-8"
                          type="text"
                          inputMode="decimal"
                          {...fieldProps}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
                          cm
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Width */}
              <FormField
                control={form.control}
                name="shipping.width"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Width</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Width"
                          value={value?.toString() || ""}
                          onChange={(e) => {
                            const formatted = formatNumericInput(
                              e.target.value
                            );
                            onChange(
                              formatted === "" ? 0 : parseFloat(formatted)
                            );
                          }}
                          className="pl-3 pr-8"
                          type="text"
                          inputMode="decimal"
                          {...fieldProps}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
                          cm
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Height */}
              <FormField
                control={form.control}
                name="shipping.height"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Height"
                          value={value?.toString() || ""}
                          onChange={(e) => {
                            const formatted = formatNumericInput(
                              e.target.value
                            );
                            onChange(
                              formatted === "" ? 0 : parseFloat(formatted)
                            );
                          }}
                          className="pl-3 pr-8"
                          type="text"
                          inputMode="decimal"
                          {...fieldProps}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
                          cm
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-400">
            <p>
              All dimensions should be of the package after being fully packed,
              not of the product itself.
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ShippingConfigForm;
