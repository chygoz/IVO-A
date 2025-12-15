import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { productSchema } from "./schema";

export type ProductFormData = z.infer<typeof productSchema>;

export interface FormContextValue {
    form: UseFormReturn<ProductFormData>;
    loading: boolean;
    error: string;
}

export const ProductFormContext = createContext<FormContextValue | null>(null);

export const useProductForm = () => {
    const context = useContext(ProductFormContext);
    if (!context) {
        throw new Error("useProductForm must be used within a FormProvider that provides ProductFormContext");
    }
    return context;
};