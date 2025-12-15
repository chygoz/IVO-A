"use client";

import { getBlank, updateBlank } from "@/actions/blanks";
import { IBlank } from "@/actions/blanks/types";
import AddNewProductForm from "@/components/products/add-product/form";
import { Button } from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import PageHeader from "@/components/ui/page-header";
import PageWrapper from "@/components/ui/pageWrapper";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Card } from "@/components/ui/card";
import ButtonText from "@/components/ui/buttonText";
import { Currency } from "@/actions/products/types";
import { ProductFormContext, useProductForm, ProductFormData } from "@/components/products/add-product/form-context";
import { productSchema } from "@/components/products/add-product/schema";

const EditFormProvider = ({ children, blank }: { children: React.ReactNode; blank: IBlank }) => {
    const router = useRouter();
    const form = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            productName: blank.name,
            description: blank.description || "",
            sizeFit: blank.sizeFit || "",
            gender: blank.gender,
            basePrice: blank.basePrice.value,
            currency: blank.basePrice.currency,
            category: blank.category._id,
            status: blank.status,
            mode: blank.mode,
            variants: blank.variants.map((v: any) => ({
                color: v.color,
                size: v.size,
                quantity: v.quantity,
                gallery: v.gallery,
                price: v.price?.value,
            })),
            shipping: {
                weight: blank.shipping?.weight || 0,
                length: blank.shipping?.dimension?.length || 0,
                width: blank.shipping?.dimension?.width || 0,
                height: blank.shipping?.dimension?.height || 0,
            },
        },
    });

    const mutation = useMutation({
        mutationFn: (data: any) => updateBlank(blank._id, data),
        onSuccess: (data) => {
            toast.success("Blank updated successfully.");
            router.push(`/dashboard/resellers/blanks/${data.data._id}`);
        },
        onError: (error: any) => {
            toast.error("Failed to update blank.", {
                description: error.message,
            });
        }
    });

    const onSubmit = (values: ProductFormData) => {
        const dataToUpdate = {
            name: values.productName,
            description: values.description,
            sizeFit: values.sizeFit,
            gender: values.gender,
            basePrice: {
                currency: values.currency as Currency,
                value: values.basePrice,
            },
            category: values.category,
            status: values.status,
            mode: values.mode,
            variants: values.variants.map((variant: any) => ({
                ...variant,
                price: variant.price ? { currency: values.currency, value: variant.price } : undefined,
            })),
            shipping: {
                ...values.shipping,
                weightUnit: 'metric' as "metric",
            },
        };
        mutation.mutate(dataToUpdate);
    };

    const state = useMemo(() => ({
        form,
        loading: mutation.isPending,
        error: mutation.isError ? mutation.error.message : "",
    }), [form, mutation.isPending, mutation.isError, mutation.error?.message]);

    return (
        <ProductFormContext.Provider value={state}>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </FormProvider>
        </ProductFormContext.Provider>
    );
};

const EditHeader = () => {
    const { loading, error } = useProductForm();
    const router = useRouter();

    return (
        <div>
            <div className="flex items-end mb-4">
                <PageHeader title="Edit Blank" />
                <div className="sm:ml-auto flex items-center gap-6">
                    <Button
                        type="button"
                        onClick={() => router.back()}
                        variant="outline"
                        className="bg-white border"
                    >
                        Cancel
                    </Button>
                    <Button disabled={loading} type="submit">
                        <ButtonText loading={loading}>Update Blank</ButtonText>
                    </Button>
                </div>
            </div>
            {error && <ErrorAlert>{error}</ErrorAlert>}
        </div>
    );
};

const BlankEditForm = ({ blank }: { blank: IBlank }) => {
    return (
        <EditFormProvider blank={blank}>
            <Card className="p-5 flex flex-col gap-5">
                <EditHeader />
                <AddNewProductForm type="blank" />
            </Card>
        </EditFormProvider>
    );
};

const BlanksEditComponent = () => {
    const { slug } = useParams();
    const [blank, setBlank] = useState<IBlank | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBlank = async () => {
            if (typeof slug !== 'string') {
                setLoading(false);
                setError("Invalid slug provided.");
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const response = await getBlank(slug as string);
                if (response?.data && Object.keys(response?.data).length > 0) {
                    setBlank(response.data as IBlank);
                } else {
                    setError("Blank not found or failed to load.");
                }
            } catch (err: any) {
                setError(err.message || "An error occurred.");
            } finally {
                setLoading(false);
            }
        };
        loadBlank();
    }, [slug]);

    if (loading) {
        return <PageWrapper><div className="flex justify-center items-center h-full"><LoadingSpinner /></div></PageWrapper>;
    }

    if (error) {
        return <PageWrapper><ErrorAlert>{error}</ErrorAlert></PageWrapper>;
    }

    if (!blank) {
        return <PageWrapper><ErrorAlert>Blank data is not available.</ErrorAlert></PageWrapper>;
    }

    return (
        <PageWrapper>
            <BlankEditForm blank={blank} />
        </PageWrapper>
    );
};

export default BlanksEditComponent;