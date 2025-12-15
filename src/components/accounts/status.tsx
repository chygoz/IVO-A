import React from "react";
import { cn } from "@/lib/utils";

interface StatusProps {
  variant?: "default" | "success" | "warning" | "error" | "info";
  text: string;
  size?: "sm" | "md";
}

const Status: React.FC<StatusProps> = ({
  variant = "default",
  text,
  size = "sm",
}) => {
  const variantStyles = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };

  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "rounded-full font-medium inline-flex items-center justify-center",
        variantStyles[variant],
        sizeStyles[size]
      )}
    >
      {text}
    </span>
  );
};

export default Status;
