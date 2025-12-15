import { Card } from "@/components/ui/card";
import PageWrapper from "@/components/ui/pageWrapper";
import React from "react";
import AddProductHeader from "./header";
import AddNewProductForm from "./form";
import { FormWrapper } from "./wrapper.form";

type AddProductComponentProps = {
  type: "blank" | "product";
};

function AddProductComponent({ type }: AddProductComponentProps) {
  return (
    <PageWrapper>
      <FormWrapper type={type}>
        <Card className="p-5 flex flex-col gap-5">
          <AddProductHeader type={type} />
          <AddNewProductForm type={type} />
        </Card>
      </FormWrapper>
    </PageWrapper>
  );
}

export default AddProductComponent;
