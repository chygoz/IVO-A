// lib/error-utils.ts
import { toast } from "@/components/ui/use-toast";

/**
 * Types of errors for categorizing and handling
 */
export enum ErrorType {
  // Network errors
  NETWORK = "network",
  TIMEOUT = "timeout",

  // API/Server errors
  API = "api",
  AUTHENTICATION = "authentication",
  AUTHORIZATION = "authorization",

  // Data errors
  VALIDATION = "validation",
  NOT_FOUND = "not_found",
  CONFLICT = "conflict",

  // Client-side errors
  RENDERING = "rendering",
  INTERACTION = "interaction",

  // Uncategorized
  UNKNOWN = "unknown",
}

/**
 * Interface for structured error information
 */
export interface ErrorInfo {
  type: ErrorType;
  message: string;
  code?: string;
  technical?: string;
  retry?: boolean;
}

/**
 * Categorizes errors based on type or status code
 */
export function categorizeError(error: unknown): ErrorInfo {
  // Handle network errors
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return {
      type: ErrorType.NETWORK,
      message:
        "Unable to connect to the server. Please check your internet connection.",
      technical: error.message,
      retry: true,
    };
  }

  // Handle timeout errors
  if (error instanceof Error && error.name === "TimeoutError") {
    return {
      type: ErrorType.TIMEOUT,
      message: "Request timed out. Please try again.",
      technical: error.message,
      retry: true,
    };
  }

  // Handle API errors with status codes
  if (error instanceof Error && "status" in error) {
    const status = (error as any).status;

    switch (status) {
      case 400:
        return {
          type: ErrorType.VALIDATION,
          message: "Invalid data provided. Please check your input.",
          technical: error.message,
          retry: false,
        };
      case 401:
        return {
          type: ErrorType.AUTHENTICATION,
          message: "Your session has expired. Please sign in again.",
          technical: error.message,
          retry: false,
        };
      case 403:
        return {
          type: ErrorType.AUTHORIZATION,
          message: "You don't have permission to perform this action.",
          technical: error.message,
          retry: false,
        };
      case 404:
        return {
          type: ErrorType.NOT_FOUND,
          message: "The requested resource was not found.",
          technical: error.message,
          retry: false,
        };
      case 409:
        return {
          type: ErrorType.CONFLICT,
          message: "This operation caused a conflict with current state.",
          technical: error.message,
          retry: true,
        };
      case 500:
      case 502:
      case 503:
      case 504:
        return {
          type: ErrorType.API,
          message:
            "We're experiencing technical difficulties. Please try again later.",
          technical: error.message,
          retry: true,
        };
      default:
        // Handle other status codes
        break;
    }
  }

  // Default case for unhandled errors
  return {
    type: ErrorType.UNKNOWN,
    message:
      error instanceof Error ? error.message : "An unexpected error occurred.",
    technical:
      error instanceof Error ? error.stack || error.message : String(error),
    retry: true,
  };
}

/**
 * Displays appropriate error message via toast
 */
export function displayErrorMessage(errorInfo: ErrorInfo): void {
  toast({
    title: getErrorTitle(errorInfo.type),
    description: errorInfo.message,
    variant: "destructive",
  });
}

/**
 * Gets user-friendly error title based on error type
 */
function getErrorTitle(errorType: ErrorType): string {
  switch (errorType) {
    case ErrorType.NETWORK:
      return "Connection Error";
    case ErrorType.TIMEOUT:
      return "Request Timeout";
    case ErrorType.API:
      return "Server Error";
    case ErrorType.AUTHENTICATION:
      return "Authentication Required";
    case ErrorType.AUTHORIZATION:
      return "Access Denied";
    case ErrorType.VALIDATION:
      return "Invalid Input";
    case ErrorType.NOT_FOUND:
      return "Not Found";
    case ErrorType.CONFLICT:
      return "Conflict Detected";
    case ErrorType.RENDERING:
      return "Display Error";
    case ErrorType.INTERACTION:
      return "Action Failed";
    case ErrorType.UNKNOWN:
    default:
      return "Unexpected Error";
  }
}

/**
 * Handles errors in a standardized way
 */
export function handleError(
  error: unknown,
  context?: Record<string, any>
): ErrorInfo {
  // 1. Categorize the error
  const errorInfo = categorizeError(error);

  // 2. Log the error (in development or send to monitoring in production)
  console.error(`[${errorInfo.type}] ${errorInfo.message}`, {
    technical: errorInfo.technical,
    context,
  });

  // 3. Display appropriate message to the user
  displayErrorMessage(errorInfo);

  // 4. Return error info for further processing if needed
  return errorInfo;
}

/**
 * Creates an async function that catches errors and handles them
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: Record<string, any>
): (...args: Parameters<T>) => Promise<ReturnType<T> | undefined> {
  return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error, {
        ...context,
        functionName: fn.name,
        arguments: args,
      });
      return undefined;
    }
  };
}
