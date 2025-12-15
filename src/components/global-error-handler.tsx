"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

/**
 * Sets up global error handling for unhandled exceptions and rejections
 */
export default function GlobalErrorHandler() {
  const router = useRouter();

  useEffect(() => {
    // Handler for unhandled exceptions
    const errorHandler = (event: ErrorEvent) => {
      event.preventDefault();
      console.error("Unhandled error:", event.error);

      // Show toast notification
      toast({
        title: "Unexpected Error",
        description:
          "An unexpected error occurred. Our team has been notified.",
        variant: "destructive",
      });

      // Log to error tracking service (in production)
      logErrorToService({
        type: "unhandled_exception",
        message: event.message || "Unhandled exception",
        stack: event.error?.stack,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      });
    };

    // Handler for unhandled promise rejections
    const rejectionHandler = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      console.error("Unhandled rejection:", event.reason);

      // Show toast notification
      toast({
        title: "Operation Failed",
        description:
          typeof event.reason === "string"
            ? event.reason
            : "An operation failed to complete. Please try again.",
        variant: "destructive",
      });

      // Log to error tracking service (in production)
      logErrorToService({
        type: "unhandled_rejection",
        message: event.reason?.message || "Unhandled promise rejection",
        stack: event.reason?.stack,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      });
    };

    // Handler for network status changes
    const onlineHandler = () => {
      toast({
        title: "You are back online",
        description: "Your connection has been restored.",
      });
    };

    const offlineHandler = () => {
      toast({
        title: "You are offline",
        description: "Please check your internet connection.",
        variant: "destructive",
      });
    };

    // Register event listeners
    window.addEventListener("error", errorHandler);
    window.addEventListener("unhandledrejection", rejectionHandler);
    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    // Cleanup
    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener("unhandledrejection", rejectionHandler);
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return null; // This component doesn't render anything
}

// Function to log errors to error tracking service
function logErrorToService(errorData: any) {
  // In a real app, you would send this to Sentry, LogRocket, etc.
  // For now, just log to console in development
  if (process.env.NODE_ENV === "development") {
    console.info("Would log to error service:", errorData);
  } else {
    // In production, you'd use something like:
    // Sentry.captureException(errorData);
    // or send to your API:
    /*
    fetch('/api/error-logging', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData),
    }).catch(err => {
      // Fail silently if error logging fails
      console.error('Failed to log error to server:', err);
    });
    */
  }
}
