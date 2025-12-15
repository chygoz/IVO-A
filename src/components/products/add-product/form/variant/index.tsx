import React from "react";
import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddProductVariant from "./add-product-variant";
import VariationWrapper from "./wrapper";
import ProductVariantTable from "./add-product-variant/table";

function ProductVariant() {
  return (
    <Card className="p-5 border border-solid border-[#E0E2E7] rounded-lg flex flex-col gap-4">
      <h5 className="font-semibold">Variation</h5>
      <VariationWrapper>
        <div>
          <ProductVariantTable />
          <SheetTrigger asChild>
            <Button className="text-[#1E1E1E]" variant="outline">
              Add Variant
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-[600px]">
            <SheetHeader>
              <SheetTitle>New Product Variant</SheetTitle>
              <SheetDescription>
                Fill in the following Information
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <AddProductVariant />
            </div>
          </SheetContent>
        </div>
      </VariationWrapper>
    </Card>
  );
}

export default ProductVariant;
