import React from "react";
import GeneralProductInformation from "./general";
import CategoryProductInformation from "./category";
import ProductPricing from "./pricing";
import ProductVariant from "./variant";
import StatusProductInformation from "./status";
import CompletionProductInformation from "./completion-status";
import CollectionProductInformation from "./collection";
import ProductLookBuilder from "./complete-look";
import ModeProductInformation from "./mode";
import GenderProductInformation from "./gender";
import ShippingConfigForm from "./shipping";

type AddNewProductFormProps = {
  type: "blank" | "product";
};

function AddNewProductForm({ type }: AddNewProductFormProps) {
  return (
    <div className="grid sm:grid-cols-12 gap-5">
      <div className="sm:col-span-8 flex flex-col gap-5">
        <GeneralProductInformation />
        <ProductPricing />
        <ProductVariant />
        {type === "product" && <ProductLookBuilder />}
      </div>
      <div className="sm:col-span-4 flex flex-col gap-5">
        <CategoryProductInformation />
        <CollectionProductInformation />
        <StatusProductInformation />
        <ModeProductInformation />
        <GenderProductInformation />
        <ShippingConfigForm />
        <CompletionProductInformation />
      </div>
    </div>
  );
}

export default AddNewProductForm;
