// hooks/use-form-toast.ts
"use client";

import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface UseFormToastOptions {
  successTitle?: string;
  successMessage?: string;
  errorTitle?: string;
  errorMessage?: string;
}

interface UseFormToastReturn {
  isSubmitting: boolean;
  handleSubmit: <T>(
    submitFn: () => Promise<T>,
    onSuccess?: (result: T) => void
  ) => Promise<T | undefined>;
}

/**
 * Custom hook for handling form submissions with toast notifications
 */
export function useFormToast({
  successTitle = "Success",
  successMessage = "Your changes have been saved successfully.",
  errorTitle = "Error",
  errorMessage = "There was a problem with your request. Please try again.",
}: UseFormToastOptions = {}): UseFormToastReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async <T>(
    submitFn: () => Promise<T>,
    onSuccess?: (result: T) => void
  ): Promise<T | undefined> => {
    setIsSubmitting(true);

    try {
      const result = await submitFn();

      toast({
        title: successTitle,
        description: successMessage,
      });

      if (onSuccess) {
        onSuccess(result);
      }

      return result;
    } catch (error) {
      toast({
        title: errorTitle,
        description: error instanceof Error ? error.message : errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }

    return undefined;
  };

  return {
    isSubmitting,
    handleSubmit,
  };
}
