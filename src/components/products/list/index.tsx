import React from "react";
import ProductTable from "./table.component";
import { Product } from "@/actions/products/types";
import { Metadata } from "@/types";
import { IBlank } from "@/actions/blanks/types";

type ProductListProps = {
  products: Product[] | IBlank[];
  metadata: Metadata;
  type: "product" | "blank";
};

function ProductList({ products, metadata, type }: ProductListProps) {
  return <ProductTable type={type} products={products} metadata={metadata} />;
}

export default ProductList;
