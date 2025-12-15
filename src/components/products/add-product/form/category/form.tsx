"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import SearchableSelect from "@/components/ui/select-with-search";
import { useQuery } from "@tanstack/react-query";
import CreateCategoryForm from "./create.category";
import { useProductForm } from "../../form-context";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { getCategories } from "@/actions/category";
import { Category } from "@/actions/category/types";

type CategoryProductInformationProps = {};

function CategoryProductInformationForm({ }: CategoryProductInformationProps) {
  const { form } = useProductForm();
  const [lastAddedCategory, setLastAddedCategory] = useState<string | null>(
    null
  );

  // Fetch categories using React Query
  const {
    data: categoryResponse,
    isLoading,
    isError,
    refetch,
  } = useQuery<{ data: { results: Category[] } }>({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const categories = useMemo(() => {
    return categoryResponse?.data?.results || [];
  }, [categoryResponse?.data]);
  // Handle selecting the recently added category
  useEffect(() => {
    if (lastAddedCategory && categories.length > 0) {
      const newCategory = categories.find(
        (cat) => cat._id === lastAddedCategory
      );
      if (newCategory) {
        form.setValue("category", newCategory._id);
      }
      // Reset lastAddedCategory after it's been processed
      setLastAddedCategory(null);
    }
  }, [categories, lastAddedCategory, form]);

  // Create a wrapped version of CreateCategoryForm that sets the lastAddedCategory
  const WrappedCreateCategoryForm = ({
    closeModal,
  }: {
    closeModal: () => void;
  }) => {
    return (
      <CreateCategoryForm
        closeModal={() => {
          closeModal();
          // After category created, refetch categories
          refetch().then((result) => {
            if (result.data?.data?.results) {
              // Find the newest category (usually the last one)
              const newestCategory =
                result.data.data.results[result.data.data.results.length - 1];
              if (newestCategory) {
                setLastAddedCategory(newestCategory._id);
              }
            }
          });
        }}
      />
    );
  };

  // Fade in animation
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <Card className="p-5 border border-solid border-[#E0E2E7] rounded-lg flex flex-col gap-4">
        <h5 className="font-semibold">Category</h5>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Category</FormLabel>
              <FormControl>
                {isLoading ? (
                  <div className="flex items-center space-x-2 h-10 px-4 py-2 border border-[#E0E2E7] rounded-lg">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Loading categories...
                    </span>
                  </div>
                ) : isError ? (
                  <div className="flex items-center h-10 px-4 py-2 border border-red-300 bg-red-50 text-red-700 rounded-lg">
                    Error loading categories. Please try again.
                  </div>
                ) : (
                  <SearchableSelect
                    value={field.value}
                    items={categories.map((category) => ({
                      label: category.name,
                      value: category._id,
                    }))}
                    CreateNewForm={WrappedCreateCategoryForm}
                    createNewText="Create new Category"
                    placeholder="-- Select a category --"
                    searchPlaceholder="Find a category"
                    emptyMessage="No categories found."
                    onChange={field.onChange}
                    disabled={isLoading}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Card>
    </motion.div>
  );
}

export default CategoryProductInformationForm;
