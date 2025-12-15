"use client";
import { createContext, useContext } from "react";
import { toast as sonnerToast } from "sonner";

type ToastVariant = "default" | "success" | "info" | "warning" | "destructive";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
};

const ToastContext = createContext<{ toast: (props: ToastProps) => void }>({
  toast: () => { },
});

export const useToast = () => useContext(ToastContext);

export const toast = ({
  title,
  description,
  variant = "default",
  duration = 3000,
  action,
}: ToastProps) => {
  const variantClassMap: Record<ToastVariant, string> = {
    default: "",
    success: "!bg-green-50 !border-green-200 !text-green-900",
    info: "!bg-blue-50 !border-blue-200 !text-blue-900",
    warning: "!bg-amber-50 !border-amber-200 !text-amber-900",
    destructive: "!bg-red-50 !border-red-200 !text-red-900",
  };

  return sonnerToast(title || "", {
    description,
    duration,
    classNames: {
      toast: variantClassMap[variant],
      title: "!font-semibold",
      description: "!opacity-90",
    },
    ...(action && { action }),
  });
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <ToastContext.Provider value={{ toast }}>{children}</ToastContext.Provider>;
};
