"use client";

import { ReactNode, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { productSchema } from "./schema";
import { Form } from "@/components/ui/form";
import { actions } from "@/constants";
import { createProduct } from "@/actions/products";
import { createBlank } from "@/actions/blanks";
import { Currency } from "@/actions/products/types";
import { ProductFormContext, ProductFormData } from "./form-context";

interface FormWrapperProps {
  children: ReactNode;
  type: "product" | "blank";
}

export function FormWrapper({ children, type }: FormWrapperProps) {
  const action = actions.find((act) => act.slug === type) || actions[0];
  const router = useRouter();
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      description: "",
      currency: "NGN",
      category: "",
      gender: "women",
      discount: {
        type: "",
        value: "",
      },
      shipping: {
        weight: 0,
        height: 0,
        length: 0,
        width: 0,
      },
      collection: "",
      status: "draft",
      mode: "pre-order",
      sizeFit: "",
      basePrice: "",
      variants: [],
    },
  });

  const mutation = useMutation({
    mutationFn: type === "blank" ? createBlank : createProduct,
    onSuccess() {
      form.reset();
      toast.success(action.creation.success);
      router.push(action.baseUrl);
    },
  });

  function onSubmit(values: ProductFormData) {
    const defaultGallery = values.variants.find((variant) => variant.gallery.length > 0)
      ?.gallery;

    if (!defaultGallery) {
      toast.error("At least one variant must have an image");
      return;
    }

    const variants = values.variants.map((variant) => {
      if (!variant.gallery || variant.gallery.length === 0) {
        return {
          ...variant,
          gallery: defaultGallery,
        };
      }
      return variant;
    });

    const data = {
      basePrice: {
        currency: "NGN" as Currency,
        value: values.basePrice,
      },
      category: values.category,
      description: values.description,
      gender: values.gender,
      name: values.productName,
      status: values.status,
      sizeFit: values.sizeFit,
      shipping: {
        weight: values.shipping.weight,
        weightUnit: "metric" as "metric",
        dimension: {
          length: values.shipping.length,
          width: values.shipping.width,
          height: values.shipping.height,
        },
      },
      mode: values.mode,
      ...(values.collection ? { collection: values.collection } : {}),
      ...(values.discount.type ? { discount: values.discount } : {}),
      variants: variants.map((variant) => {
        const { price, ...rest } = variant;
        return {
          ...rest,
          ...(price
            ? {
              price: {
                currency: "NGN" as Currency,
                value: price,
              },
            }
            : {}),
        };
      }),
    };

    mutation.mutate(data);
  }

  const state = useMemo(() => {
    return {
      form,
      loading: mutation.isPending,
      error: mutation.isError ? mutation.error.message : "",
    };
  }, [form, mutation.isPending, mutation.isError, mutation.error?.message]);

  return (
    <ProductFormContext.Provider value={state}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          {children}
        </form>
      </FormProvider>
    </ProductFormContext.Provider>
  );
}