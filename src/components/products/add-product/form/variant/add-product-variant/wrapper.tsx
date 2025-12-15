"use client";
import { z } from "zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { variantSchema } from "./schema";
import React from "react";

export type ProductVariantFormData = z.infer<typeof variantSchema>;

export interface FormContextValue {
  variantForm: UseFormReturn<ProductVariantFormData>;
  value: VariantValue[];
  onChange: (...event: any[]) => void;
  closeModal: () => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export const useVariantProductForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useProductForm must be used within FormProvider");
  }
  return context;
};

interface VariantValue {
  color: {
    name: string;
    code: string;
    hex: string;
  };
  quantity: number;
  size: {
    name: string;
    code: string;
    displayName: string;
    sortOrder: number;
  };
  gallery: {
    type: string;
    mode: string;
    view: string;
    url: string;
  }[];
  price?: string;
}

interface FormWrapperProps {
  children: ReactNode;
  value: VariantValue[];
  onChange: (...event: any[]) => void;
  closeModal: () => void;
}

export function VariantFormWrapper({
  children,
  value,
  onChange,
  closeModal,
}: FormWrapperProps) {
  const variantForm = useForm<ProductVariantFormData>({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      color: { hex: "", name: "" },
      size: { label: "", value: "" },
      price: "",
      currency: "NGN",
      quantity: 1,
      images: [],
      id: ""
    },
  });

  return (
    <FormContext.Provider value={{ variantForm, value, onChange, closeModal }}>
      <Form {...variantForm}>
        <form className="">{children}</form>
      </Form>
    </FormContext.Provider>
  );
}
