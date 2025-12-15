import React from "react";
import PageWrapper from "../ui/pageWrapper";
import ProductList from "./list";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Product } from "@/actions/products/types";
import { Metadata } from "@/types";
import { actions } from "@/constants";
import { IBlank } from "@/actions/blanks/types";

type ProductsComponentProps = {
  products: Product[] | IBlank[];
  metadata: Metadata;
  type: "product" | "blank";
};

function ProductsComponent({
  products,
  metadata,
  type = "product",
}: ProductsComponentProps) {
  const action = actions.find((actn) => actn.slug === type) || actions[0];
  return (
    <PageWrapper>
      <Card className="p-5 bg-white shadow-none border-none">
        <div className="flex items-center">
          <h4 className="text-xl font-semibold">{action.name}</h4>
          <div className="ml-auto">
            <Button className="rounded-lg font-medium text-xs" asChild>
              <Link href={action.creation.href}>{action.creation.title}</Link>
            </Button>
          </div>
        </div>
        <ProductList products={products} metadata={metadata} type={type} />
      </Card>
    </PageWrapper>
  );
}

export default ProductsComponent;
