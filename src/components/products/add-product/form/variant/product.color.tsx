"use client";
import ColorPicker from "@/components/ui/color-picker";
import React, { useState } from "react";

type ProductColorProps = {
  value: { hex: string; name: string };
  onChange: (value: { hex: string; name: string }) => void;
};

function ProductColor({ value, onChange }: ProductColorProps) {
  const [open, setOpen] = useState(false);
  return (
    <ColorPicker
      open={open}
      setOpen={setOpen}
      color={value}
      setColor={onChange}
    />
  );
}

export default ProductColor;
