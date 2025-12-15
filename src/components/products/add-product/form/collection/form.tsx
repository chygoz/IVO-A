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
import CreateCollectionForm from "./create.collection";
import { useProductForm } from "../../form-context";;
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Collection } from "@/actions/collections/types";
import { getMyCollections } from "@/actions/collections";

type CollectionProductInformationProps = {};

function CollectionProductInformation({ }: CollectionProductInformationProps) {
  const { form } = useProductForm();
  const [lastAddedCollection, setLastAddedCollection] = useState<string | null>(
    null
  );

  // Fetch collections using React Query
  const {
    data: collectionResponse,
    isLoading,
    isError,
    refetch,
  } = useQuery<{ data: { results: Collection[] } }>({
    queryKey: ["myCollections"],
    queryFn: getMyCollections,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const collections = useMemo(() => {
    return collectionResponse?.data?.results || [];
  }, [collectionResponse?.data]);

  // Handle selecting the recently added collection
  useEffect(() => {
    if (lastAddedCollection && collections.length > 0) {
      const newCollection = collections.find(
        (coll) => coll._id === lastAddedCollection
      );
      if (newCollection) {
        form.setValue("collection", newCollection._id);
      }
      // Reset lastAddedCollection after it's been processed
      setLastAddedCollection(null);
    }
  }, [collections, lastAddedCollection, form]);

  // Create a wrapped version of CreateCollectionForm that sets the lastAddedCollection
  const WrappedCreateCollectionForm = ({
    closeModal,
  }: {
    closeModal: () => void;
  }) => {
    return (
      <CreateCollectionForm
        closeModal={() => {
          closeModal();
          // After collection created, refetch collections
          refetch().then((result) => {
            if (result.data?.data?.results) {
              // Find the newest collection (usually the last one)
              const newestCollection =
                result.data.data.results[result.data.data.results.length - 1];
              if (newestCollection) {
                setLastAddedCollection(newestCollection._id);
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
        <h5 className="font-semibold">Collection</h5>
        <FormField
          control={form.control}
          name="collection"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Collection (Optional)</FormLabel>
              <FormControl>
                {isLoading ? (
                  <div className="flex items-center space-x-2 h-10 px-4 py-2 border border-[#E0E2E7] rounded-lg">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Loading collections...
                    </span>
                  </div>
                ) : isError ? (
                  <div className="flex items-center h-10 px-4 py-2 border border-red-300 bg-red-50 text-red-700 rounded-lg">
                    Error loading collections. Please try again.
                  </div>
                ) : (
                  <SearchableSelect
                    value={field.value || ""}
                    items={collections.map((collection) => ({
                      label: collection.name,
                      value: collection._id,
                    }))}
                    CreateNewForm={WrappedCreateCollectionForm}
                    createNewText="Create a new collection"
                    placeholder="-- Select a collection --"
                    searchPlaceholder="Find a collection"
                    emptyMessage="No collections found."
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

export default CollectionProductInformation;
