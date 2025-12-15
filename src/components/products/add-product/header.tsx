"use client";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";
import { actions } from "@/constants";
import { useRouter } from "next/navigation";
import React from "react";
import ButtonText from "@/components/ui/buttonText";
import ErrorAlert from "@/components/ui/error-alert";
import { useProductForm } from "./form-context";

type AddProductHeaderProps = {
  type: "product" | "blank";
};

function AddProductHeader({ type }: AddProductHeaderProps) {
  const router = useRouter();
  const { loading, error } = useProductForm();
  const action = actions.find((act) => act.slug === type) || actions[0];
  return (
    <div>
      <div className="flex items-end mb-4">
        <PageHeader title={action.name} />
        <div className="sm:ml-auto flex items-center gap-6">
          <Button
            type="button"
            onClick={() => router.back()}
            variant="outline"
            className="bg-white border"
          >
            Cancel
          </Button>
          <Button disabled={loading}>
            <ButtonText loading={loading}>{action.creation.title}</ButtonText>
          </Button>
        </div>
      </div>
      {error && <ErrorAlert>{error}</ErrorAlert>}
    </div>
  );
}

export default AddProductHeader;
