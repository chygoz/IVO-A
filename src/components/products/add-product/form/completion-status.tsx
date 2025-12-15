"use client";
import React from "react";
import { useProductForm } from "../form-context";

function CompletionProductInformation() {
  const { form } = useProductForm();
  return (
    <div className="flex items-center gap-4 justify-between">
      <h5 className="font-semibold">Product Completion</h5>
      <div className="bg-[#FEECEE] text-[#EF0606] text-[14px] w-[42px] h-[28px] rounded-lg flex items-center justify-center">
        0%
      </div>
    </div>
  );
}

export default CompletionProductInformation;
