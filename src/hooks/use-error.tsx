"use client";

import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

type ErrorHandler = {
  error: Error | null;
  handleError: (error: unknown) => void;
  clearError: () => void;
};

interface ErrorLogPayload {
  message: string;
  stack?: string;
  url: string;
  timestamp: string;
  userAgent: string;
}

/**
 * Custom hook to handle errors in a consistent way across the application
 */
export function useErrorHandler(): ErrorHandler {
  const [error, setError] = useState<Error | null>(null);

  const logErrorToServer = useCallback(
    async (errorPayload: ErrorLogPayload) => {
      // In a real application, you would send this to your error logging service
      // like Sentry, LogRocket, or your own API endpoint

      // Simulating error logging for now
      console.error("Error logged to server:", errorPayload);

      // Example of how you might send to an API endpoint:
      // try {
      //   await fetch('/api/log-error', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(errorPayload),
      //   });
      // } catch (e) {
      //   // Fail silently if error logging fails
      //   console.error('Failed to log error to server:', e);
      // }
    },
    []
  );

  const handleError = useCallback(
    (err: unknown) => {
      // Ensure we have a proper Error object
      const error = err instanceof Error ? err : new Error(String(err));

      // Set the error state
      setError(error);

      // Show a toast notification
      //@ts-expect-error
      toast.error({
        title: "An error occurred",
        description:
          error.message ||
          "Please try again or contact support if the problem persists.",
      });

      // Log to console for development
      console.error(error);

      // Log to server for production monitoring
      logErrorToServer({
        message: error.message,
        stack: error.stack,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      });
    },
    [logErrorToServer]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
}
