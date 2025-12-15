import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
// utils/getToken.js
import { getSession } from "next-auth/react";
import { navigation } from "@/components/layout/navigation";

export async function getToken() {
  const session = await getSession();
  if (session) {
    return session.accessToken; // Adjust based on how the token is stored in your session
  }
  return null;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(input: string): string {
  if (!input) return "";
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

interface JwtPayload {
  exp: number;
}

export function isTokenValid(token?: string): boolean {
  if (!token) return false;
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);

    // Get the current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if the token has expired
    return decodedToken.exp > currentTime;
  } catch (error) {
    // If decoding fails, the token is not valid
    return false;
  }
}

//takes query which is an object of param fields
export function resolveParams(query: any) {
  if (typeof query !== "object") {
    return "";
  }
  const q = Object.entries(query)
    .filter((m) => m[1] !== null && m[1] !== "")
    .map((m) => `${m.join("=")}`)
    .join("&");

  if (q) {
    return `?${q}`;
  }

  return "";
}

export function greetBasedOnTime(): string {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "good afternoon";
  } else {
    return "good evening";
  }
}

export function convertTo12HourFormat(hour: number): string {
  // Validate input
  if (hour < 0 || hour > 23) {
    throw new Error("Hour must be between 0 and 23.");
  }

  // Determine AM or PM
  const period = hour < 12 ? "AM" : "PM";

  // Convert hour from 24-hour to 12-hour format
  const hour12 = hour % 12 || 12; // Converts 0 to 12 and handles 12-23 correctly

  // Return formatted string
  return `${hour12}:00 ${period}`;
}

export function formatToNaira(str: string) {
  if (typeof str === "string")
    return `₦${str.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  return `₦${`${str}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function calculateAge(dateString: string): number {
  // Validate input format
  const isValidFormat = /^\d{2}\/\d{4}$/.test(dateString);
  if (!isValidFormat) {
    throw new Error("Invalid date format. Expected MM/YYYY");
  }

  // Split the date string into month and year
  const [monthStr, yearStr] = dateString.split("/");
  const month = parseInt(monthStr, 10) - 1; // Subtract 1 as months are 0-based in JS
  const year = parseInt(yearStr, 10);

  // Validate month
  if (month < 0 || month > 11) {
    throw new Error("Invalid month. Month should be between 01 and 12");
  }

  // Create date objects for comparison
  const birthDate = new Date(year, month);
  const currentDate = new Date();

  // Calculate age
  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // Adjust age if we haven't reached the birth month yet this year
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    currentDate.getMonth() === birthDate.getMonth()
  ) {
    age--;
  }

  return age;
}

export const validatePageParam = (page?: string): number => {
  if (!page) {
    return 1;
  }

  const parsedPage = parseInt(page, 10);

  // Check if the parsed value is a valid positive number
  if (isNaN(parsedPage) || parsedPage < 1) {
    return 1;
  }

  return parsedPage;
};

/**
 * Formats a number to a currency string with the appropriate symbol
 * @param amount - The number to format
 * @param currencyType - The currency type ('NGN' or 'USD')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currencyType: "NGN" | "USD"
): string {
  // Define the currency symbol based on the currency type
  const currencySymbol = currencyType === "NGN" ? "₦" : "$";

  // Format the number with commas for thousands separator and fixed 2 decimal places
  const formattedAmount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  // Return the formatted string with the appropriate currency symbol
  return `${currencySymbol}${formattedAmount}`;
}

// Format date and time
export function formatDateTime(dateString: string | Date): string {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;

  return new Intl.DateTimeFormat("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function copyToClipboard(text: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      navigator.clipboard.writeText(text);
      resolve(true);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      resolve(false);
    }
  });
}

// Format date only
export function formatDate(dateString: string | Date): string {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;

  return new Intl.DateTimeFormat("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

// Get transaction status color
export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "failed":
      return "bg-red-100 text-red-800";
    case "reversed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
}

// Get transaction type color
export function getTransactionTypeColor(type: string): string {
  switch (type.toLowerCase()) {
    case "credit":
      return "bg-green-100 text-green-800";
    case "debit":
      return "bg-amber-100 text-amber-800";
    case "booking":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Format large numbers with K, M, B suffixes
export function formatLargeNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

// Get time ranges for filters
export function getTimeRangeOptions() {
  return [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 3 months" },
  ];
}

// Format transaction reference to be user-friendly
export function formatReference(ref: string): string {
  if (!ref) return "N/A";

  // If it's a UUID or long string, truncate it
  if (ref.length > 12) {
    return ref.substring(0, 8) + "...";
  }

  return ref;
}

// Get animation variants for Framer Motion
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const pulseAnimation = {
  initial: { scale: 1 },
  pulse: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      yoyo: Infinity,
    },
  },
};

// Create download URL for blob
export function createDownloadUrl(blob: Blob): string {
  return URL.createObjectURL(blob);
}

// Download file from URL
export function downloadFile(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Cleanup the object URL if it was created with createObjectURL
  if (url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
}

// Get file extension from URL or filename
export function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || "";
}

// Check if file is an image
export function isImageFile(filename: string): boolean {
  const ext = getFileExtension(filename);
  return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext);
}

// Check if file is a PDF
export function isPdfFile(filename: string): boolean {
  return getFileExtension(filename) === "pdf";
}

// Get file type for preview
export function getFileType(filename: string): "image" | "pdf" | "other" {
  if (isImageFile(filename)) return "image";
  if (isPdfFile(filename)) return "pdf";
  return "other";
}

// Convert base64 to a Blob
export function base64ToBlob(base64: string, contentType: string): Blob {
  // Remove data URL prefix if present
  const base64Data = base64.includes("base64,")
    ? base64.split("base64,")[1]
    : base64;

  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

// Download base64 content
export function downloadBase64Content(
  base64: string,
  contentType: string,
  filename: string
): void {
  const blob = base64ToBlob(base64, contentType);
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
type route = {
  href: string,
  name: string,
  actors: string[]
}
function getAllRoutes() {
  const routes: route[] = [];

  navigation.forEach(section => {
    section.children.forEach(item => {
      routes.push({
        href: item.href,
        name: item.name,
        actors: item.actors
      });
    });
  });

  return routes
}
export const findMatchingRoute = (pathname: string) => {
  const routes = getAllRoutes();

  // Find the most specific match first
  for (const route of routes) {
    if (pathname === route.href) {
      // Exact match - highest priority
      return route;
    }
  }

  // If no exact match, find the most specific parent route
  for (const route of routes) {
    if (pathname.startsWith(route.href + '/')) {
      // Parent route match (e.g., /dashboard/resellers/blanks matches /dashboard/resellers/blanks/123/edit)
      return route;
    }
  }

  // No match found
  return null;
}