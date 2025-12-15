import React from "react";
import ProductImages from "../product-image";
import FormFields from "./fields";
import AddVariationButton from "./add.button";

function AddProductVariant() {
  return (
    <div className="flex flex-col gap-6">
      <FormFields />
      <ProductImages />
      <AddVariationButton />
    </div>
  );
}

export default AddProductVariant;
